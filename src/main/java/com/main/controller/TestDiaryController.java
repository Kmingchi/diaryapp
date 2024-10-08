package com.main.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class TestDiaryController {
	
	DiaryService ds=new DiaryService();
	
	@GetMapping("/diary/list")
	public ResponseEntity<ArrayList<Diary>> getDiary() {
		return new ResponseEntity<ArrayList<Diary>>(ds.getDiaryArr(),HttpStatus.OK);
	}
}
@Data
class DiaryService{
	ArrayList<Diary> diaryArr;
	int seq;
	DiaryService(){
		diaryArr=new ArrayList<Diary>();
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-05-07","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-06-07","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-06-07","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-06-08","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-06-08","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-06-09","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-06-09","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-07-10","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-07-11","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-07-13","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-07-17","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-07-27","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-09-27","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2024-10-15","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2025-01-15","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	  diaryArr.add(new Diary(seq++,"일기는 사람의 훌륭한 인생 자습서다.","2025-01-20","초등학교에서는 1학년 국어 교육과정에서 일기쓰는 방법에 대해 공부한다. 있었던 일을 머릿속에 정리하고 글로 써보는 활동이 글쓰기의 시작이고 쉽게 접근할 수 있는 방법이기 때문이다. 학교 교육과정에서 다루는 한 두 단원만으로 충분한 연습이 되지 않기 때문에 학교에서 숙제로 일기를 쓰기 시작하고 때문에 일기를 쓰는 것을 괴로워하는 초등학생도 있다. 학기 중에도 일기 쓰기가 숙제로 나오는 경우가 많고, 여름방학 숙제로 일기 쓰기가 자주 나오는데, 대체로 마지막 날에 방학 동안 경험했던 일을 모두 기억해 내거나, 경험하지 않았던 일을 경험한 것처럼 날조하는 행위로 변질되기도 한다. 예전 명랑만화를 보면 어느정도 알 수 있다. 안쓰는 초등학생도 있으며 점차 초등학교 고학년부터 일기 숙제가 없는 경우도 많아지고 있다.",""));
	}
}


@NoArgsConstructor
@AllArgsConstructor
class Diary{
	@JsonProperty
	int seq;
	@JsonProperty
	String title;
	@JsonProperty
	String date;
	@JsonProperty
	String content;
	@JsonProperty
	String photo;
}