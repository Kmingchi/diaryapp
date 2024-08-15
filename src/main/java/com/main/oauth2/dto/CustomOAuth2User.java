package com.main.oauth2.dto;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.main.user.dto.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class CustomOAuth2User implements OAuth2User{
	private String username;
	private String name;
	private String email;

	@Override
	public Map<String, Object> getAttributes() {
		return null;
	}
	
	public CustomOAuth2User(CustomOAuth2User user) {
		username=user.getUsername();
		name=user.getName();
		email=user.getEmail();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	
	public String getName() {
		return name;
	}
	
	public String getUsername() {
        return username;
    }

}
