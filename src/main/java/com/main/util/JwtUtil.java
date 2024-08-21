package com.main.util;

import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.main.properties.JwtProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtUtil {
	
	 private final JwtProperties jwtProperties;
	 
	 private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();
	 
	 public String getUsernameUsingCookie(HttpServletRequest request) {
		 Cookie token=CookieUtil.findCookie("Authorization", request);
		 if(token==null) {
			 return null;
		 }
		 String userId =getUsername(token.getValue());
		 return userId;
	 }

    public String getUsername(String token) {
       return getClaims(token).get("username",String.class);
    }
    
    public boolean isValidToken(String token) {
       try {
    	   Jwts.parser()
		    	   .setSigningKey(jwtProperties.getSecretKey())
					.build()
					.parseClaimsJws(token);
    	   return true;
       } catch(Exception e) {
    	   return false;
       }
    }
    
    public Claims getClaims(String token) {
    	return Jwts.parser()
				.setSigningKey(jwtProperties.getSecretKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
    }

    public String createAccessToken(String username, Long expiredMs) {
        return Jwts.builder()
        		.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
        		.issuer(jwtProperties.getIssur())
                .claim("username", username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(SignatureAlgorithm.HS256,jwtProperties.getSecretKey())
                .compact();
    }
    
    public String extractTokenFromRequest(HttpServletRequest request) {
        // 먼저 Authorization 헤더에서 토큰을 찾습니다
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        
        // 헤더에 없다면 쿠키에서 토큰을 찾습니다
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Authorization".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        
        // 토큰을 찾지 못했다면 null을 반환합니다
        return null;
    }
    
    
    public void invalidateToken(String token) {
        if (isValidToken(token)) {
            blacklistedTokens.add(token);
        }
    }

    // 선택적: 주기적으로 만료된 토큰을 블랙리스트에서 제거하는 메서드
    public void cleanupBlacklist() {
        Date now = new Date();
        blacklistedTokens.removeIf(token -> {
            try {
                Claims claims = getClaims(token);
                return claims.getExpiration().before(now);
            } catch (Exception e) {
                return true; // 파싱 불가능한 토큰은 제거
            }
        });
    }
    
}
