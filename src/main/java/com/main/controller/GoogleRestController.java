package com.main.controller;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.main.util.CookieUtil;
import com.main.util.GoogleUploadUtil;
import com.main.util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GoogleRestController {
	
	private final JwtUtil jwtUtil;
	
	private final GoogleUploadUtil googleUploadUtil;
	
	@Value("${custom.diary_img.savepath}")
	String diary_path;
	
	@PostMapping("/api/google")
	public ResponseEntity uploadStorage(@RequestParam(value="file") List<MultipartFile>files) {
		List<String> path=googleUploadUtil.googleUploadProcess(files,"temp");
		
		return new ResponseEntity<String>(path.toString(),HttpStatus.OK);
	}
	
	@PostMapping("/api/google/diary")
	public ResponseEntity<Map<String, String>> uploadDiaryStorage(@RequestParam(value="file") List<MultipartFile> files,
	                                                              HttpServletRequest request) {
	    //유효성 확인
	    Cookie token = CookieUtil.findCookie("Authorization", request);
	    if (token == null) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
	    String username = jwtUtil.getUsername(token.getValue());
	    log.info("요청 시도한 id : " + username);
	    List<String> path = googleUploadUtil.googleUploadProcess(files, diary_path + username);
	    
	    Map<String, String> response = new HashMap<>();
	    response.put("url", path.get(0));
	    
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/api/google/diary")
	public ResponseEntity<String> deleteObject(@RequestBody String url){
		try {
			url=URLDecoder.decode(url);
			boolean isDeleted = googleUploadUtil.deleteImage(url);
			if(isDeleted) {
				return new ResponseEntity<>("object succeessfully deleted",HttpStatus.OK);
			}else {
				return new ResponseEntity<>("object not found",HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("object not found",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
