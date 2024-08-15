package com.main.token.service;

import org.springframework.stereotype.Service;

import com.main.user.dto.User;
import com.main.user.service.UserService;

import lombok.RequiredArgsConstructor;

/*
@Service
@RequiredArgsConstructor
public class TokenService {

		private final TokenProvider tokenProvider;
		private final UserService userService;
		private final RefreshTokenService refreshTokenService;
		
		public String createNewAccessToken(String refreshToken) {
			if(!tokenProvider.validateToken(refreshToken)) {
				throw new IllegalArgumentException("유효하지 않은 토큰");
			}
			
			String UserId=refreshTokenService.findByRefreshToken(refreshToken).getUserId();
			User user=userService.findByUserId(UserId);
			
			return tokenProvider.generateAccessToken(user);
		}
}
*/