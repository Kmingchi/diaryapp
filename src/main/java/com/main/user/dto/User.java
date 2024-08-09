package com.main.user.dto;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Table(name="user_db")
@Getter
@Setter
@Entity
@ToString
@RequiredArgsConstructor
public class User implements UserDetails {
	@Id
	@Column(name="user_id")
	private String userId;
	
	@Column(name="nickname",nullable=false)
	private String nickname;
	
	@Column(name="password")
	private String password;
	
	@Column(name="email",nullable=false)
	private String email;

	@Column(name="profile_image")
	private String profile_image;
	
	@Builder
	public User(String user_id,String nickname,String password,String email,String profile_image) {
		this.userId=user_id;
		this.nickname=nickname;
		this.password=password;
		this.email=email;
		this.profile_image=profile_image;
	}
	
	public User(String user_id,String password) {
		this.userId=user_id;
		this.password=password;
	}
	
	//권한 반환
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("user"));
	}

	public String getUsername() {
		return userId;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public boolean isAccountNonExpired() {
		return true;
	}
	public boolean isAccountNonLocked() {
		return true;
	}
	public boolean isCredentialsNonExpired() {
		return true;
	}
	public boolean isEnabled() {
		return true;
	}
}
