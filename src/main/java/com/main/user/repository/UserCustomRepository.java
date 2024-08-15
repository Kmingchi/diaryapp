package com.main.user.repository;

import java.util.List;
import java.util.Map;

import com.main.user.dto.User;

public interface UserCustomRepository {
	List<User> findUser(String uesr_id,String email,String nickname);
}
