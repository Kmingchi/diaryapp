package com.main.diary.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.main.diary.dto.TempDiary;
import com.main.diary.dto.TempDiaryDTO;
import com.main.diary.repository.TempDiaryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TempDiaryService {
	
	private final TempDiaryRepository tempRepo;
	
	public void saveDiaryToStorage(TempDiaryDTO tempDiaryDTO) {
		tempRepo.save(tempDiaryDTO.toEntity());
	}
	
	public ArrayList<TempDiary> getByUserId(String userId){
		return tempRepo.findByUserId(userId);
	}
	
	public TempDiary getByStorageId(int storageId) {
		return tempRepo.findById(storageId)
				.orElseThrow(()->new IllegalArgumentException("not found"));
	}
}
