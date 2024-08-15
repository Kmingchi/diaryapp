package com.main.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {
	private String issur;
	private String secretKey;
}
