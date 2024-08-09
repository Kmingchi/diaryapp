package com.main.token.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class TokenRestController {
	
	private final JwtUtil jwtUtil;
	
	@PostMapping("/api/token/validation")
	public ResponseEntity<String> isTokenValidate(HttpServletRequest request){
		Cookie[]cookies=request.getCookies();
		String token=null;
		
		if(cookies!=null) {
			for(Cookie cookie:cookies) {
				if(cookie.getName().equals("Authorization")) {
					token=cookie.getValue();
				}
			}
		}
		if(token==null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(token);
		}
		
		if(jwtUtil.isValidToken(token)) {
			log.info("유효한 토큰");
			return ResponseEntity.status(HttpStatus.OK)
					.body(token);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(token);
		
	}
	
	//리프레시토큰 구현하다 망해서 일단 중단
	//@Autowired
	//private final TokenService tokenService;
	
	/*
	@PostMapping("/api/token")	
	public ResponseEntity<CreateTokenDTO> createAccessToken(@RequestBody CreateTokenDTO request){
		String newAccessToken=tokenService.createNewAccessToken(request.getToken());
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new CreateTokenDTO(newAccessToken));
	}
	*/
}


/*
@Data
@AllArgsConstructor
class CreateTokenDTO{
	private String token;
}
*/