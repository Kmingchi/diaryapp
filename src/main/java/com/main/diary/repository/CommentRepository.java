package com.main.diary.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.main.diary.dto.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
	Optional<List<Comment>> findByDiaryId(int diaryId);
	
	@Modifying
	@Query(value="delete from comment_db where comment_parent_id=:comment_id or comment_id=:comment_id;", nativeQuery=true)
	void DeleteComment(@Param("comment_id") int commentId);
}
