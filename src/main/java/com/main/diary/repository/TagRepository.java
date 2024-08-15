package com.main.diary.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.diary.dto.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer>{
	public Optional<List<Tag>> findByDiaryId(int diaryId);
}
