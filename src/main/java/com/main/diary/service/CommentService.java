package com.main.diary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.main.diary.dto.Comment;
import com.main.diary.dto.CommentDTO;
import com.main.diary.repository.CommentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepo;
	
	public List<Comment> getAllComments(int diaryId){
		return commentRepo.findByDiaryId(diaryId)
				.orElseThrow(()->new IllegalArgumentException("not found"));	
	}
	
	public void saveParentComment(CommentDTO c) {
		commentRepo.save(c.toEntity());
	}
	
	@Transactional
	public void deleteComment(int commentId) {
		commentRepo.DeleteComment(commentId);
	}
}
