package com.main.user.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserProfileDTO {
    private String profile_image;
    private String nickname;
    private String email;
}