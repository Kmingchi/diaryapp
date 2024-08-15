package com.main.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class TempDiaryDTO {
	private String userId;
	private String title;
	private String content;
	private String date;
	private String photo;
	private String sticker;
	
	@Builder
	public TempDiary toEntity() {
		return TempDiary.builder()
				.userId(userId)
				.title(title)
				.content(content)
				.date(date)
				.photo(photo)
				.sticker(sticker)
				.build();
	}
}
