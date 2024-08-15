package com.main.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties("kakao")
public class KakaoProperties {
	private String key;
	private String clientSecret;
	private String redirectUri;
}
