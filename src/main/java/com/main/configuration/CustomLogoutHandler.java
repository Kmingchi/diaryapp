package com.main.configuration;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import com.google.api.Authentication;
import com.main.util.CookieUtil;
import com.main.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomLogoutHandler implements LogoutHandler {

    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

    public CustomLogoutHandler(JwtUtil jwtUtil, CookieUtil cookieUtil) {
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response,
			org.springframework.security.core.Authentication authentication) {
		String token = jwtUtil.extractTokenFromRequest(request);
        if (token != null) {
            jwtUtil.invalidateToken(token);
            cookieUtil.deleteCookie(request, response, "Authorization");
        }
		
	}

}