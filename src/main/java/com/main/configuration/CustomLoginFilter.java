package com.main.configuration;



import java.time.Duration;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.main.user.dto.User;
import com.main.user.service.CustomUserDetailsService;
import com.main.util.CookieUtil;
import com.main.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class CustomLoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

		//클라이언트 요청에서 username, password 추출
        String id = obtainUsername(request);
        String password = obtainPassword(request);
        
        log.info("요청한 id와 password : "+id+" / "+password);
        
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password, null);
        return authenticationManager.authenticate(authToken);
    }

		//로그인 성공 
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
    	log.info("로그인 성공");
    	User user=(User)authentication.getPrincipal();
    	//일단 6시간동안 유효, 리프레쉬토큰 생성할거면 바꿔야됨
    	String token=jwtUtil.createAccessToken(user.getUserId(),Duration.ofHours(6).toMillis());
    	//쿠키에 추가
    	cookieUtil.addCookie(response,"Authorization",token, 60 * 60 * 6);
    	response.addHeader("Authorization", "Bearer "+token);
    }

		//로그인 실패
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
    	log.info("로그인 실패");
    	response.setStatus(401);
    }
}