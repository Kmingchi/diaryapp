package com.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.main.properties.KakaoProperties;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
public class TempController {
	private final KakaoProperties kakaoApi;
	
	@GetMapping("/")
	public String goIntroPage() {
		return "views/main/intro";
	}
	@GetMapping("/fragment/nav")
	public String getNavbar() {
		return "layout/navbar";
	}
	
	@GetMapping("/main")
	public String goMainPage() {
		return "views/main/index";
	}
	
	@GetMapping("/login")
	public String goLoginPage(Model model) {
		model.addAttribute("key",kakaoApi.getKey());
		model.addAttribute("redirectUri",kakaoApi.getRedirectUri());
		return "views/login/login";
	}
	
	@GetMapping("/register")
	public String goRegisterPage() {
		return "views/login/register";
	}
	@GetMapping("/write")
	public String goWritePage() {
		return "views/diary/write";
	}
	@GetMapping("/list")
	public String goListPage() {
		return "views/diary/list";
	}
	
	@GetMapping("/timeline")
	public String goBoard() {
		return "views/board/board";
	}
	
	@GetMapping("/private")
	public String goPrivatePage() {
		return "views/diary/private";
	}
	
	@GetMapping("/friend")
	public String goFriendPage() {
		return "views/diary/friend";
	}
	

    @GetMapping("/chat")
    public String goToChat() {
        return "views/chat/chat";
    }
	
	@GetMapping("/market")
	public String goMarketPage() {
		return "views/shop/market";
	}	
	
	@GetMapping("/game")
	public String goGamePage() {
		return "views/game/game";
	}
	
	@GetMapping("/ladders")
	public String goLaddersPage() {
		return "views/game/ladders";
	}
	
	@GetMapping("/dice")
	public String goDicePage() {
		return "views/game/dice";
	}
	
	@GetMapping("/rsp")
	public String goRspPage() {
		return "views/game/rsp";
	}
	
	@GetMapping("/mole")
	public String goMolePage() {
		return "views/game/mole";
	}	
	
	@GetMapping("/setting")
	public String goSettingPage() {
		return "views/setting/setting";
	}
}
