package com.main.user.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.user.dto.User;
import com.main.user.dto.UserDTO;
import com.main.user.dto.UserProfileDTO;
import com.main.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	@Autowired
	private final UserRepository userRepo;
	
	public User saveUser(UserDTO user) {
		return userRepo.save(user.toEntity());
	}
	
	public List<User> findAll(){
		return userRepo.findAll();
	}
	public UserProfileDTO findSpecificByUserId(String userId) {
		return userRepo.getSpecific(userId)
				.orElseThrow(()->new IllegalArgumentException("Not Found"));
	}
	
	public User findUser(String email,String user_id,String nickname) {
		return userRepo.findByEmailOrUserIdOrNickname(email, user_id, nickname)
				.orElseThrow(()->new IllegalArgumentException("Not Found"));
	}
	
	public User findByUserId(String user_id) {
		return userRepo.findByUserId(user_id)
				.orElseThrow(()->new IllegalArgumentException("Not Found/ user_id : "+user_id));
	}
	
	public User findByNickname(String nickname) {
		return userRepo.findByNickname(nickname)
				.orElseThrow(()->new IllegalArgumentException("Not Found/ nickname: "+nickname));
	}
	
	public User findByEmail(String email) {
		return userRepo.findByEmail(email)
				.orElseThrow(()->new IllegalArgumentException("Not Found/ email: "+email));
	}
	public User findByEmailAndNickname(String email,String nickname) {
		return userRepo.findByEmailAndNickname(email,nickname)
				.orElseThrow(()->new IllegalArgumentException("Not Found/ email: "+email+", nickname : "+nickname));
	}
	public User findByEmailAndUserId(String email,String user_id) {
		return userRepo.findByEmailAndUserId(email,user_id)
				.orElseThrow(()->new IllegalArgumentException("Not Found/ email: "+email+", user_id : "+user_id));
	}
}
