package com.main.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.diary.dto.Emotion;

public interface EmotionRepository extends JpaRepository<Emotion, Integer>{

}
