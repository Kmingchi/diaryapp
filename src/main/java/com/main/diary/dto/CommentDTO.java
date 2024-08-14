package com.main.diary.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CommentDTO {

	private int commentParentId;
	private int commentLayer;
	private int diaryId;
	private String userId;
	private String text;
	
	public Comment toEntity() {
		return Comment.builder()
				.commentLayer(commentLayer)
				.commentParentId(commentParentId)
				.diaryId(diaryId)
				.userId(userId)
				.text(text)
				.build();
	}
}

