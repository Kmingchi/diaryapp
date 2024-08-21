package com.main.configuration;

import org.springframework.boot.autoconfigure.security.reactive.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.main.oauth2.service.CustomOAuth2UserService;
import com.main.util.CookieUtil;
import com.main.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final CustomOAuth2UserService customOAuth2UserService;
	private final AuthenticationConfiguration authenticationConfiguration;
	private final CustomLogoutHandler customLogoutHandler;
	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	@Bean
	public CustomOAuth2SuccessHandler customSuccessHandler() {
		return new CustomOAuth2SuccessHandler(cookieUtil,jwtUtil);
	}
	
	@Bean
	public WebSecurityCustomizer configure() {
		return (web)->web.ignoring()
				.requestMatchers(
							new AntPathRequestMatcher("/resources/**"),
							new AntPathRequestMatcher("/static/**"),
		                    new AntPathRequestMatcher("/css/**"),
		                    new AntPathRequestMatcher("/js/**"),
		                    new AntPathRequestMatcher("/javascript/**"),
		                    new AntPathRequestMatcher("/image/**"),
		                    new AntPathRequestMatcher("/images/**"),
		                    new AntPathRequestMatcher("/webjars/**")
						);
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http.csrf(AbstractHttpConfigurer::disable)
			  .httpBasic(AbstractHttpConfigurer::disable)
			  .formLogin(AbstractHttpConfigurer::disable);
		
		//http.headers(headers -> headers
               // .contentSecurityPolicy("default-src 'self'; script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net; style-src 'self' https://cdn.jsdelivr.net")
           // );
          //  
		//oaut2 세팅 
		http
			.oauth2Login((oauth2) -> oauth2
					.loginPage("/login").permitAll()
					.userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
							.userService(customOAuth2UserService)
							)
					.successHandler(customSuccessHandler())
					);
			  
		http.authorizeHttpRequests((auth)-> auth
				.requestMatchers("/").permitAll()
				.requestMatchers("/login/*","/register").permitAll()
				.requestMatchers("/api/token/validation").permitAll()
				.requestMatchers("/email/**","/user/**").permitAll()
				.requestMatchers("/admin").hasRole("ADMIN")
				.anyRequest().authenticated()
				)
				.logout(logout -> logout
                .logoutUrl("/logout")
                .addLogoutHandler(customLogoutHandler)
                .logoutSuccessUrl("/")
                .permitAll()
        );
			
	    http.headers()
	    		.frameOptions()
	    		.sameOrigin();
	    
		http.addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
		
	   http.addFilterAt(new CustomLoginFilter(authenticationManager(authenticationConfiguration),jwtUtil,cookieUtil), UsernamePasswordAuthenticationFilter.class);
	    
	    http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
	    
	    return http.build();
	}
	
	 @Bean
    public static BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
