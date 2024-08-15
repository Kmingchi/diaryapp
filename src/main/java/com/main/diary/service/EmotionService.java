package com.main.diary.service;

import org.springframework.stereotype.Service;

import com.main.diary.dto.Diary;
import com.main.diary.dto.DiaryDTO;
import com.main.diary.dto.Emotion;
import com.main.diary.dto.EmotionDTO;
import com.main.diary.repository.DiaryRepository;
import com.main.diary.repository.EmotionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmotionService {
	private final EmotionRepository emoRepo;
	
	public Emotion saveEmo(EmotionDTO dto){
		return emoRepo.save(dto.toEntity());
	}
}