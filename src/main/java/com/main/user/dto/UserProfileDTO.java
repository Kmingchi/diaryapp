package com.main.user.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Component
public interface UserProfileDTO {
	String getProfileImage();
    String getNickname();
    String getEmail();
}