package com.main.diary.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.main.diary.service.TempDiaryService;
import com.main.util.CookieUtil;
import com.main.util.GoogleEmotionUtil;
import com.main.util.JwtUtil;
import com.main.diary.dto.Diary;
import com.main.diary.dto.DiaryDTO;
import com.main.diary.dto.EmotionDTO;
import com.main.diary.dto.TagDTO;
import com.main.diary.service.DiaryService;
import com.main.diary.service.EmotionService;
import com.main.diary.service.TagService;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class DiaryRestController {

	private final DiaryService diaryService;
	private final TagService tagService;
	private final EmotionService emoService;
	private final JwtUtil jwtUtil;
	private final GoogleEmotionUtil emoUtil;
	
	@PostMapping("/api/diary")
	public ResponseEntity saveDiary(
			@RequestBody DiaryDTO diaryDTO,
			HttpServletRequest request) throws IOException{
		String username=jwtUtil.getUsernameUsingCookie(request);
		diaryDTO.setUserId(username);
		if(diaryDTO.getDate()==null) {
			diaryDTO.setDate(LocalDate.now().toString());
		}

		log.info(diaryDTO.toString());
		log.info(diaryDTO.getTagString());
		log.info(diaryDTO.getRawString());
		Diary d=diaryService.saveDiary(diaryDTO);

		Map<String,String>emoRst=emoUtil.test(diaryDTO.getRawString());
		
		EmotionDTO emo=new EmotionDTO();
		emo.setDiaryId(d.getDiaryId());
		emo.setUserId(username);
		emo.setScore(Float.parseFloat(emoRst.get("score")));
		emo.setScore(Float.parseFloat(emoRst.get("magnitude")));
		emo.setDominantEmotion(emoRst.get("emotion"));
		emoService.saveEmo(emo);	
		
		String[]tags=null;
		if(diaryDTO.getTagString()!=null) {
			log.info("tags");
			tags=diaryDTO.getTagString().split(",");
		}
		for(String tag : tags) {
			TagDTO t=new TagDTO();
			t.setDiaryId(d.getDiaryId());
			t.setTagName(tag);
			log.info(t.toString());
			tagService.saveTag(t);
		}
		return new ResponseEntity<Diary>(d,HttpStatus.CREATED);
	}
	
	@GetMapping("/api/diary")
	public ResponseEntity<List<Diary>> getDiary(@RequestParam boolean all, HttpServletRequest req) {
		String userId=jwtUtil.getUsernameUsingCookie(req);
		
		if(all) {
			return new ResponseEntity<List<Diary>>(diaryService.findAll(),HttpStatus.OK);
		}else {
			return new ResponseEntity<List<Diary>>(diaryService.findByUserID(userId),HttpStatus.OK);
		}
	}
	
	@GetMapping("/api/diary/diaryId/{diaryId}")
	public ResponseEntity getDiaryByUserId(@PathVariable int diaryId) {
		return new ResponseEntity<Diary>(diaryService.findById(diaryId),HttpStatus.OK);
	}
	
	@GetMapping("/api/diary/date/{date}")
	public ResponseEntity getDiaryByDate(@PathVariable String date) {
		return new ResponseEntity<List<Diary>>(diaryService.findByDate(date),HttpStatus.OK);
	}
}
