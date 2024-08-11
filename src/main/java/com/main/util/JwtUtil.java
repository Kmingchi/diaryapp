package com.main.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.main.properties.JwtProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtUtil {
	
	 private final JwtProperties jwtProperties;
	 
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
}
