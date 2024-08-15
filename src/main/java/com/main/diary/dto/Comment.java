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
@Table(name="comment_db")
@Getter
@Setter
@RequiredArgsConstructor
public class Comment {
	@Id
	@Column(name="comment_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commentId;
	
	@Column(name="comment_parent_id")
	private int commentParentId;
	
	@Column(name="comment_layer")
	private int commentLayer;
	
	@Column(name="diary_id")
	private int diaryId;
	
	@Column(name="user_id")
	private String userId;
	
	@Column(name="text")
	private String text;
	
	@Builder
	public Comment(int commentParentId,int commentLayer,int diaryId,String userId, String text) {
		this.commentParentId=commentParentId;
		this.commentLayer=commentLayer;
		this.diaryId=diaryId;
		this.userId=userId;
		this.text=text;
	}
}
