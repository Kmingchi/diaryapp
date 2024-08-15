package com.main.diary.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.main.diary.dto.Diary;
import com.main.diary.dto.TempDiary;
import com.main.diary.dto.TempDiaryDTO;
import com.main.diary.service.TempDiaryService;
import com.main.properties.JwtProperties;
import com.main.util.CookieUtil;
import com.main.util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor
@RestController
public class TempDiaryRestController {
	
	private final JwtUtil jwtUtil;
	
	private final TempDiaryService diaryService;
	
	@PostMapping("/diary/temp")
	public void save(@RequestBody TempDiaryDTO tempDiaryDTO,HttpServletRequest request) {
		log.info(tempDiaryDTO.toString());
		String userId=getUserId(request);
	   
	    tempDiaryDTO.setUserId(userId);
	    tempDiaryDTO.setDate(LocalDate.now().toString());
	    
	    diaryService.saveDiaryToStorage(tempDiaryDTO);
	}
	
	@GetMapping("/diary/temp")
	public ResponseEntity<List<TempDiary>> getByUserId(HttpServletRequest request){
		String userId=getUserId(request);
		ArrayList<TempDiary>list=diaryService.getByUserId(userId);
	
		if(list==null) {
			return new ResponseEntity<List<TempDiary>>(list,HttpStatus.NOT_FOUND);
		}else {
			return new ResponseEntity<List<TempDiary>>(list,HttpStatus.OK);			
		}
	}
	
	@GetMapping("/diary/temp/storageId")
	public ResponseEntity getStorgeById(@RequestParam int storageId) {
		TempDiary temp=null;
		try {
			temp=diaryService.getByStorageId(storageId);
			return new ResponseEntity<TempDiary>(temp,HttpStatus.OK);			
		}catch(IllegalArgumentException e) {
			return new ResponseEntity<TempDiary>(temp,HttpStatus.NOT_FOUND);			
		}
	}
	
	public String getUserId(HttpServletRequest request) {
		//유효성 확인
	    Cookie token = CookieUtil.findCookie("Authorization", request);
	    if (token == null) {
	        return null;
	    }
	    String userId = jwtUtil.getUsername(token.getValue());
	    return userId;
	}
}
