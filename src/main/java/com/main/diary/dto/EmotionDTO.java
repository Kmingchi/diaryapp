package com.main.diary.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class EmotionDTO {
	private int diaryId;
	private String userId;
	private double score;
	private double magnitude;
	private String dominantEmotion;
	
	public Emotion toEntity() {
		return Emotion.builder()
				.diaryId(diaryId)
				.userId(userId)
				.score(score)
				.magnitude(magnitude)
				.dominantEmotion(dominantEmotion)
				.build();
	}
}
