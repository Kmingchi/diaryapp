package com.main.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.main.user.dto.User;
import com.main.user.repository.UserRepository;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private final UserRepository userRepo;
	
	@Override
	public User loadUserByUsername(String user_id) throws UsernameNotFoundException {
		User user=userRepo.findByUserId(user_id)
				.orElseThrow(()->new IllegalArgumentException(user_id));
		return user;
	}
}