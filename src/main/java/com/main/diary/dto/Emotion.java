package com.main.diary.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="emotion_db")
@Getter
@Setter
@RequiredArgsConstructor
public class Emotion {
	@Id
	@Column(name="emotion_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int emotionId;
	
	@Column(name="diary_id")
	private int diaryId;
	
	@Column(name="user_id")
	private String userId;
	
	@Column(name="score")
	private double score;
	
	@Column(name="magnitude")
	private double magnitude;
	
	@Column(name="dominant_emotion")
	private String dominantEmotion;
	
	@Builder
	public Emotion(int diaryId,String userId,double score,double magnitude,String dominantEmotion){
		this.diaryId=diaryId;
		this.userId=userId;
		this.score=score;
		this.magnitude=magnitude;
		this.dominantEmotion=dominantEmotion;
	}
}
