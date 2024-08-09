package com.main.diary.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaryDTO {
	private String userId;
	private String title;
	private String content;
	private String date;
	private String photo;
	private String sticker;
	private int isPublic;
	private int emotionId;
	 
	@Builder
	public Diary toEntity() {
		return Diary.builder()
				.userId(userId)
				.title(title)
				.content(content)
				.date(date)
				.photo(photo)
				.isPublic(isPublic)
				.emotionId(emotionId)
				.build();
	}
}
