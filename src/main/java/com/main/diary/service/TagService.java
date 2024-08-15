package com.main.diary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.main.diary.dto.Tag;
import com.main.diary.dto.TagDTO;
import com.main.diary.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {
	
	private final TagRepository tagRepo;
	
	public void saveTag(TagDTO tag) {
		tagRepo.save(tag.toEntity());
	}
	
	public List<Tag> getTagByDiaryId(int diaryId){
		return tagRepo.findByDiaryId(diaryId)
				.orElseThrow(()->new IllegalArgumentException("not found"));
	}
}
