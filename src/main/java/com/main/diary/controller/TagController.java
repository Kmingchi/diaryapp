package com.main.diary.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.main.diary.dto.Tag;
import com.main.diary.service.TagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TagController {
	
	private final TagService tagService;
	
	@GetMapping("/api/tag/{diaryId}")
	public ResponseEntity getTag(@PathVariable int diaryId) {
		List<Tag> tagList=null;
		try {
			tagList=tagService.getTagByDiaryId(diaryId);
			return new ResponseEntity<>(tagList,HttpStatus.OK);
		}catch(IllegalArgumentException e){
			return new ResponseEntity<>(tagList,HttpStatus.NOT_FOUND);			
		}
	}
}
