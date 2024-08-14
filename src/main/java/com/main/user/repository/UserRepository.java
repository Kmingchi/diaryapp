package com.main.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.main.user.dto.User;
import com.main.user.dto.UserProfileDTO;

@Repository
public interface UserRepository extends JpaRepository<User,String>{
	Optional<User> findByUserId(String user_id);
	
	Optional<User> findByNickname(String nickname);
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findByEmailAndNickname(String email, String nickname);
	
	Optional<User> findByEmailAndUserId(String email,String user_id);
	
	Optional<User> findByEmailOrUserIdOrNickname(String email,String user_id,String nickname);
	
	@Query(value = "SELECT u.profile_image as profileImage , u.nickname as nickname , u.email as email FROM user_db u WHERE u.user_id = :userId", nativeQuery = true)
	Optional<UserProfileDTO> getSpecific(@Param("userId") String userId);

}
