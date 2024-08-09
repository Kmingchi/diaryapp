package com.main.oauth2.service;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.main.oauth2.dto.CustomOAuth2User;
import com.main.oauth2.dto.KakaoResponse;
import com.main.oauth2.dto.NaverResponse;
import com.main.oauth2.dto.OAuth2Response;
import com.main.user.dto.User;
import com.main.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
	
	private final UserRepository userRepository;
	
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        log.info(oAuth2User.toString());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {
        	log.info("시도한 로그인 : naver");
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        else if (registrationId.equals("kakao")) {
        	log.info("시도한 로그인 : kakao");
        	Map<String,Object> kakao_account=(Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        	Map<String,Object> profile=(Map<String, Object>) kakao_account.get("profile");
           oAuth2Response = new KakaoResponse(
        		   oAuth2User.getAttributes().get("id").toString()
        		   ,profile.get("nickname").toString()
        		   ,kakao_account.get("email").toString());
        }
        else {
            return null;
        }
	 String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
	 User userData;
	 try {
		userData =userRepository.findByUserId(username).get();
	 }catch(Exception e) {
		 userData=null;
		 log.info(e.getMessage());
	 }
	  
	 CustomOAuth2User userDTO=new CustomOAuth2User(username,oAuth2Response.getName(),oAuth2Response.getEmail());
	 if (userData == null) {
		 //db에 데이터가 없는 경우
		 log.info("가입되지 않은 사용자입니다.");
		 userData=new User();
		 userData.setUserId(username);
		 userData.setNickname(userDTO.getName());
		 userData.setEmail(userDTO.getEmail());
		 
         userRepository.save(userData);
     }
     else {
    	 //db에 데이터가 있는 경우
    	 log.info("가입된 사용자입니다.");
     	}
	 return new CustomOAuth2User(userDTO);
    }
}