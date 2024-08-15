package com.main.configuration;

import java.io.IOException;
import java.time.Duration;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.main.oauth2.dto.CustomOAuth2User;
import com.main.util.CookieUtil;
import com.main.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final CookieUtil cookieUtil;
	private final JwtUtil jwtUtil;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		CustomOAuth2User user=(CustomOAuth2User) authentication.getPrincipal();
		log.info("OAUTH2  로그인 성공");
		log.info(user.toString());
		
		String username=user.getUsername();
		
		//6시간동안 유효
		String token=jwtUtil.createAccessToken(username, Duration.ofHours(6).toMillis());
		
		//6시간동안 유효 
		cookieUtil.addCookie(response, "Authorization", token,60*60*6);
		getRedirectStrategy().sendRedirect(request,response,"http://localhost:8080/private");
		return;
	}
}
