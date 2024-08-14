package com.main.diary.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
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

