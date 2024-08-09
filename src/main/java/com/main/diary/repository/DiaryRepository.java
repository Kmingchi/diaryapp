package com.main.diary.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.diary.dto.Diary;

@Repository
public interface DiaryRepository extends JpaRepository<Diary,Integer>{
	public ArrayList<Diary> findByUserId(String userId);
}
