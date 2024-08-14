package com.main.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.language.v2.AnalyzeSentimentResponse;
import com.google.cloud.language.v2.Document;
import com.google.cloud.language.v2.Document.Type;

import lombok.extern.slf4j.Slf4j;

import com.google.cloud.language.v2.LanguageServiceClient;
import com.google.cloud.language.v2.LanguageServiceSettings;
import com.google.cloud.language.v2.Sentiment;

@Slf4j
@Component
public class GoogleEmotionUtil {
	public Map<String,String> test(String str) throws FileNotFoundException, IOException{
		InputStream keyFile=ResourceUtils.getURL("classpath:mycdnproject-430417-004c27ee2089.json").openStream();

        GoogleCredentials credentials = GoogleCredentials.fromStream(keyFile);

        try (LanguageServiceClient language = LanguageServiceClient.create(LanguageServiceSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build())) {

            Document doc = Document.newBuilder().setContent(str).setType(Document.Type.PLAIN_TEXT).build();
            AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
            Sentiment sentiment = response.getDocumentSentiment();
            if (sentiment == null) {
               log.info("감정 분석에 실패했습니다.");
            } else {
            	log.info("감정 척도: ", sentiment.getMagnitude());
            	log.info("감정 스코어: ", sentiment.getScore());
            }
            String emotion;
            if(sentiment.getScore() < -0.2) {
            	emotion="부정";
            }else if(sentiment.getScore() > 0.2) {
            	emotion="긍정";
            }else {
            	emotion="부정";
            }
            return Map.of("score",Float.toString(sentiment.getScore()),
            		"magnitude",Float.toString(sentiment.getMagnitude()),
            		"emotion",emotion);
        }catch(IOException e) {
        	e.printStackTrace();
        	return null;
        }
	}
}
        
        
	

