package com.main.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.main.configuration.SecurityConfig;
import com.main.user.dto.User;
import com.main.user.dto.UserDTO;
import com.main.user.dto.UserProfileDTO;
import com.main.user.service.UserService;
import com.main.util.FileUploadUtil;
import com.main.util.GoogleUploadUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UserRestController {
	@Autowired
	UserService userService;
	
	@Value("${custom.profile_img.savepath}")
	String path;
	
	@GetMapping("/user") 
	public ResponseEntity getUser(
			@RequestParam(value="id",required=false) String user_id,
			@RequestParam(value="email", required=false) String email,
			@RequestParam(value="nickname", required=false) String nickname
			) {
		log.info("user_id : "+user_id+" , email : "+email+" , nickname : "+nickname);
		User u=null;
		try {
			u=userService.findUser(email, user_id, nickname);
			return new ResponseEntity<User>(u,HttpStatus.OK);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<User>(u,HttpStatus.NOT_FOUND);
		}
	} 
	
	@GetMapping("/user/specific/{userId}")
	public ResponseEntity getProfile(@PathVariable String userId) {
		UserProfileDTO u=null;
		try {
			u=userService.findSpecificByUserId(userId);
			return new ResponseEntity<UserProfileDTO>(u,HttpStatus.OK);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<UserProfileDTO>(u,HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/user/verification")
	public ResponseEntity isExist(
			@RequestParam(value="email") String email,
			@RequestParam(value="id") String user_id
			) {
		try {
			User u=userService.findByEmailAndUserId(email,user_id);
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<Boolean>(false,HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/user/verification/email")
	public ResponseEntity isEmailExist(@RequestParam String email) {
		try {
			User u=userService.findByEmail(email);
			return new ResponseEntity<String>(email, HttpStatus.OK);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<String>(email,HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping("/user/verification/id")
	public ResponseEntity isUser_idExist(@RequestParam String id) {
		log.info("id : "+id);
		try {
			User u=userService.findByUserId(id);
			return new ResponseEntity<String>(id, HttpStatus.OK);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<String>(id,HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping("/user/verification/nickname")
	public ResponseEntity isUsernameExist(@RequestParam String nickname) {
		log.info("nickname : "+nickname);
		try {
			User u=userService.findByNickname(nickname);
			return new ResponseEntity<String>(nickname, HttpStatus.OK);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<String>(nickname,HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/user")
	public ResponseEntity saveUser(
			@RequestParam(value="id") String user_id,
			@RequestParam(value="nickname") String nickname,
			@RequestParam(value="password") String password,
			@RequestParam(value="email") String email,
			@RequestParam(value="file") List<MultipartFile> files,
			//귀찮게 바꾸기 싫어서 리스트로 선언
			HttpServletResponse response
			) throws IOException {
		List<String> filePath=null;
		UserDTO user=null;
		
		password=SecurityConfig.bCryptPasswordEncoder().encode(password);
		log.info("암호화된 비밀번호 :"+ password);
		
		try {
			//구글 업로드로 바꿈
			filePath=new GoogleUploadUtil().googleUploadProcess(files,path+user_id);
			//filePath=FileUploadUtil.fileUpload(files, path+user_id);
			if(filePath.size()==0) {
				log.info("error : 파일없음");
			}
			if(filePath.get(0)!=null) {
				user=new UserDTO(user_id,nickname,password,email,filePath.get(0));
			}else {
				user=new UserDTO(user_id,nickname,password,email,"image/login/temp_default_img.png");
			}
			
			log.info("저장하려는 정보 : "+user);
			User u=userService.saveUser(user);
			//저장 성공한거임
			response.sendRedirect("/login");
			return new ResponseEntity<User>(u,HttpStatus.CREATED);
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<UserDTO>(user,HttpStatus.BAD_REQUEST);
		}
	}
}
