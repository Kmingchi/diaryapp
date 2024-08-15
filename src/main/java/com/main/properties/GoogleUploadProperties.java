package com.main.properties;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.Getter;
import lombok.ToString;

//오류때문에 사용못하는 중
@ToString
@Getter
@Component
@ConfigurationProperties("storage")
public class GoogleUploadProperties {
	private String credentialLocation;
	private String bucket;
}
