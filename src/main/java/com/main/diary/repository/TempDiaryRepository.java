package com.main.diary.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.diary.dto.TempDiary;


@Repository
public interface TempDiaryRepository extends JpaRepository<TempDiary,Integer>{
	public ArrayList<TempDiary> findByUserId(String userId);
}

