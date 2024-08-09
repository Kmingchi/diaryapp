package com.main.email.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.email.dto.Email;
import com.main.email.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class EmailController {
	
	protected final EmailService emailService;
	
	@Autowired
	RedisTemplate<String, String>redisTemplate;
	
	@PostMapping("/email/verification/request")
	public ResponseEntity<Email> emailVerification(@RequestBody Email email) {
		log.info("email : "+email);
		try {
			emailService.sendEmail(email.getEmail());
			email.setMessage("발송완료");
			
			return new ResponseEntity<Email>(email,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Email>(email,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/email/verification")
	public ResponseEntity<Email> emailVerificationDo(@RequestBody Email email) {
		final ValueOperations<String,String> vo=redisTemplate.opsForValue();
		
		try {
			String number=vo.get(email.getEmail());
			if(number.equals(email.getCode())) {
				email.setMessage("통과");
				return new ResponseEntity<Email>(email,HttpStatus.OK);
			}else {
				email.setMessage("값이 올바르지 않습니다.");
				return new ResponseEntity<Email>(email,HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}catch(Exception e) {
			email.setMessage("메시지가 만료되었습니다. ");
			return new ResponseEntity<Email>(email,HttpStatus.NOT_FOUND);
		}
	}
}
