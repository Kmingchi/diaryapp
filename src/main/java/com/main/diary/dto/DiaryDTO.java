package com.main.diary.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DiaryDTO {
	private String userId;
	private String title;
	private String content;
	private String date;
	private String photo;
	private String sticker;
	private int isPublic;
	private int emotionId;
	private String tagString;
	private String rawString;
	
	@Builder
	public Diary toEntity() {
		return Diary.builder()
				.userId(userId)
				.title(title)
				.content(content)
				.date(date)
				.photo(photo)
				.sticker(sticker)
				.isPublic(isPublic)
				.emotionId(emotionId)
				.build();
	}
}
