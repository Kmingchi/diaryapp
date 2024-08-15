package com.main.configuration;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.main.user.dto.User;
import com.main.user.service.UserService;
import com.main.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter{

	private final Logger log=LoggerFactory.getLogger(JwtFilter.class);
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {				
		
    	//Authorization 헤더에 있는지 확인
    	boolean isCanPass=true;
    	String token=null;
    	//request에서 Authorization 헤더를 찾음
        String authorization= request.getHeader("Authorization");
		
        //log.info("인증 진행 중");
		//Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            //log.info("유효하지 않은 토큰 : 헤더에 없음");
           isCanPass=false;
        }
        
		//Bearer 부분 제거 후 순수 토큰만 획득
        if(authorization!=null) {
        	 token=authorization.split(" ")[1];
        }
        
        
		//유효한 토큰인지 검증
        if ( !jwtUtil.isValidToken(token)) {	
           //log.info("유효하지 않은 토큰 : 헤더에 만료됨");
            isCanPass=false;
        }
        
        //쿠키에 있으면 그냥 통과임
        String cookieToken=null;
        Cookie[]cookies=request.getCookies();
        if(cookies!=null) {
        	 for(Cookie cookie : cookies) {
             	//log.info("확인 중인 쿠키 : "+cookie.getName());
             	if(cookie.getName().equals("Authorization")) {
             		cookieToken=cookie.getValue();
             	}
             }
        }
   
        if(cookieToken==null && !isCanPass) {
        	//log.info("토큰, 헤더에 전부 없음");
        	//log.info("걸러진 요청:"+request.getRequestURI());
        	filterChain.doFilter(request, response);
        	return;
        } 
        
        if(cookieToken!=null && !jwtUtil.isValidToken(cookieToken)) {
        	//log.info("쿠키에 저장된 토큰 만료됨 ");
        	filterChain.doFilter(request, response);
        	return;
        }
        //log.info("토큰 통과됨 : 인증성공!!!!!!!!!!!!!!!!!!");
        token=cookieToken!=null?cookieToken:token;
        //log.info("token : "+token);
        
		//토큰에서 username과 role 획득
        String username = jwtUtil.getUsername(token);
				
		//요청마다 DB를 조회하는게 별로 좋은건 아니라
        //일단 임시로
        User user=new User(username,"tempPassword");
		
		//스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
		//security contextholder에 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}