package com.main.email.service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.main.email.dto.Email;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	
	//이메일 전송을 도와주는 객체
    private final JavaMailSender javaMailSender;  
    private static final String senderEmail= "onejodiary@gmail.com";
    
    @Autowired
    RedisTemplate<String, String>redisTemplate;
    
    private static int number;  // 랜덤 인증 코드

    // 랜덤 인증 코드 생성(8자리)
    public static String createNumber() {
    	StringBuilder sb=new StringBuilder();
        try {
			Random rand= SecureRandom.getInstanceStrong();
			for(int i=0;i<8;i++) {
				sb.append(rand.nextInt(10));
			}
			number=Integer.parseInt(sb.toString());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
        return sb.toString();
    }

    // 메일 양식 작성
    public MimeMessage createMail(String mail){
        createNumber();  // 인증 코드 생성
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);   // 보내는 이메일
            message.setRecipients(MimeMessage.RecipientType.TO, mail); // 보낼 이메일 설정
            message.setSubject("[비망록] 이메일 인증");  // 제목 설정
            String body = "";
            body += "<h1>" + "안녕하세요." + "</h1>";
            body += "<h1>" + "비망록 입니다." + "</h1>";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3><br>";
            body += "<h2>" + "아래 코드를 입력해주세요." + "</h2>";

            body += "<div align='center' style='border:1px solid black; font-family:verdana;'>";
            body += "<h2>" + "인증 코드입니다." + "</h2>";
            body += "<h1 style='color:blue'>" + number + "</h1>";
            body += "</div><br>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return message;
    }

    // 실제 메일 전송
    public void sendEmail(String userId) {
        // 메일 전송에 필요한 정보 설정
        MimeMessage message = createMail(userId);
        // 실제 메일 전송
        javaMailSender.send(message);
        
        //redis에 값 저장
        final ValueOperations<String, String> vo=redisTemplate.opsForValue();
        
        vo.set(userId, number+"", 180, TimeUnit.SECONDS);
    }
}