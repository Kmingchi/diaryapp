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
@Table(name="tag_db")
@Getter
@Setter
@RequiredArgsConstructor
public class Tag {
	@Id
	@Column(name="tag_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tagId;
	
	@Column(name="tag_name")
	private String tagName;
	
	@Column(name="diaryId")
	private int diaryId;
	
	@Builder
	public Tag(String tagName,int diaryId) {
		this.tagName=tagName;
		this.diaryId=diaryId;
	}
}
