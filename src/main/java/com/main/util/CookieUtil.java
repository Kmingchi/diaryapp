package com.main.util;

import java.util.Base64;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.SerializationUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtil {
	public static void addCookie(HttpServletResponse response,String name,String value,int maxAge) {
		Cookie cookie=new Cookie(name,value);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(maxAge);
		response.addCookie(cookie);
	}
	
	public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
		Cookie[] cookies=request.getCookies();
		if(cookies==null) {
			return;
		}
		for(Cookie cookie : cookies) {
			if(name.equals(cookie.getName())) {
				cookie.setValue("");
				cookie.setPath("/");
				cookie.setMaxAge(0);
				response.addCookie(cookie);
			}
		}
	}
	public static Cookie findCookie(String str,HttpServletRequest request) {
		Cookie[]cookies=request.getCookies();
		
		if(cookies==null) {
			return null;
		}
		
		for(Cookie cookie : cookies) {
			if(str.equals(cookie.getName())) {
				return cookie;
			}
		}
		return null;
	}
	
	
	//객체 -> 쿠기
	public static String serialize(Object obj) {
		return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(obj));
	}
	//쿠키 -> 객체
	public static <T> T deserialize(Cookie cookie, Class<T> cls) {
		return cls.cast(SerializationUtils.deserialize(
				Base64.getUrlDecoder().decode(cookie.getValue())
			));
	}
}

