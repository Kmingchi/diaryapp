package com.main.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class UserDTO {
	private String user_id;
	private String nickname;
	private String password;
	private String email;
	private String profile_image;
	
	public User toEntity() { 
		return User.builder()
				.user_id(user_id)
				.nickname(nickname)
				.password(password)
				.email(email)
				.profile_image(profile_image)
				.build();
	}
}
