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
public class TagDTO {
	private String tagName;
	private int diaryId;
	
	@Builder
	public Tag toEntity() {
		return Tag.builder()
				.tagName(tagName)
				.diaryId(diaryId)
				.build();
	}
	
}
