package com.main.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.diary.dto.Comment;
import com.main.diary.dto.CommentDTO;
import com.main.diary.service.CommentService;
import com.main.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CommentController {
	
	private final CommentService commentServ;
	private final JwtUtil jwtUtil;
	
	@GetMapping("/api/comment/{diaryId}")
	public ResponseEntity allComment(@PathVariable int diaryId) {
		List<Comment> l=null;
		try {
			l=commentServ.getAllComments(diaryId);
			return new ResponseEntity<>(l,HttpStatus.OK);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<>(l,HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/api/comment")
	public void saveComment(
			@RequestBody CommentDTO c,
			HttpServletRequest req) {
		String username=jwtUtil.getUsernameUsingCookie(req);
		//댓글이 없는 경우
		//parentId가 0이면 부모임
		if(c.getUserId()==null) {
			c.setUserId(username);
		}
		log.info(c.toString());
		commentServ.saveParentComment(c);
	}
	
	@DeleteMapping("/api/comment")
	public ResponseEntity deleteComment(Integer commentId, String parentId,HttpServletRequest req) {
		log.info("요청한 데이터/ commentId :"+commentId+",parentId : "+parentId);
		String username=jwtUtil.getUsernameUsingCookie(req);
		if(!username.equals(parentId)) {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
		commentServ.deleteComment(commentId);
		return new ResponseEntity(HttpStatus.OK);
	}
}
