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
@Table(name="diary_db")
@Getter
@Setter
@RequiredArgsConstructor
public class Diary {
	@Id
	@Column(name="diary_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int diaryId;
	
	@Column(name="user_id")
	private String userId;
	
	@Column(name="title")
	private String title;
	
	@Column(name="content")
	private String content;
	
	@Column(name="date")
	private String date;
	
	//대표 이미지 설정
	@Column(name="photo")
	private String photo;
	
	@Column(name="sticker")
	private String sticker;
	
	@Column(name="is_public")
	private int isPublic;
	
	@Column(name="emotion_id")
	private int emotionId;
	
	@Builder
	public Diary(String userId,String title,String content,String date,String photo,String sticker,int isPublic,int emotionId) {
		this.userId=userId;
		this.title=title;
		this.content=content;
		this.date=date;
		this.photo=photo;
		this.sticker=sticker;
		this.isPublic=isPublic;
		this.emotionId=emotionId;
	}
}
