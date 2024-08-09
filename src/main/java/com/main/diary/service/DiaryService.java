package com.main.diary.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.main.diary.dto.Diary;
import com.main.diary.dto.DiaryDTO;
import com.main.diary.repository.DiaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryService {
	private final DiaryRepository diaryRepo;
	
	public Diary saveDiary(DiaryDTO diaryDTO) {
		return diaryRepo.save(diaryDTO.toEntity());
	}
	
	public List<Diary>findAll(){
		return diaryRepo.findAll();
	}
	
	public ArrayList<Diary>findByUserID(String userId){
		return diaryRepo.findByUserId(userId);
	}
	
	public Diary findById(int diaryId) {
		return diaryRepo.findById(diaryId)
				.orElseThrow(() -> new IllegalArgumentException("not found "));
	}
}
