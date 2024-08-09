package com.main.user.repository.Impl;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;

import java.util.List;
import java.util.Map;

import com.main.user.dto.User;
import com.main.user.dto.UserDTO;
import com.main.user.repository.UserCustomRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.util.StringUtils;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
 
/*
@RequiredArgsConstructor
public class UserCustomRepositoryImpl implements UserCustomRepository{
	private final JPAQueryFactory query;
	public List<User> findUser(String user_id,String email,String nickname) {
		return query.selectFrom(user)
				.where(
						
				)
	}
	
	private BooleanExpression userIdEq(String user_id) {
		return StringUtils.isNullOrEmpty(user_id) ? null : 	
	}
}

*/