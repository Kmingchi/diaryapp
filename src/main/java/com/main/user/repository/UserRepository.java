package com.main.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.user.dto.User;

@Repository
public interface UserRepository extends JpaRepository<User,String>{
	Optional<User> findByUserId(String user_id);
	
	Optional<User> findByNickname(String nickname);
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findByEmailAndNickname(String email, String nickname);
	
	Optional<User> findByEmailAndUserId(String email,String user_id);
	
	Optional<User> findByEmailOrUserIdOrNickname(String email,String user_id,String nickname);
}
