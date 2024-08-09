package com.main.oauth2.dto;

import java.util.Map;

public class KakaoResponse implements OAuth2Response{
	
	private final String USER_ID;
	private final String EMAIL;
	private final String NICKNAME;

    public KakaoResponse(String USER_ID,String NICKNAME,String EMAIL) {
    	this.USER_ID=USER_ID;
    	this.EMAIL=EMAIL;
    	this.NICKNAME=NICKNAME;
    }
	
	@Override
	public String getProvider() {
		return "kakao";
	}

	@Override
	public String getProviderId() {
		return USER_ID;
	}

	@Override
	public String getEmail() {
		return EMAIL;
	}

	@Override
	public String getName() {
		return NICKNAME;
	}

}
