//이메일 검증기능 일일이 넣기 귀찮아서 만든 javascript
//이름 최대한 안겹치게 할려고 길어질 수 있음
//url.js import 해야 쓸 수 잇음

console.log("serverURL : "+serverURL);

//1. 이메일 중복확인(비동기 방식) - boolean 반환(email)
//중복 시 : true / 아닐 시 : false 
function isEmailAlreadyExistInDB(email){
	var emailAlreadyExist=false;
	$.ajax({
		type:"GET",
		url:serverURL+"/user/verification/email?email="+email,
		async:false,
		success:function(e){
			console.log("중복됨");
			emailAlreadyExist=true;
		},error:function(e){
			console.log(e);
		}
	});
	return emailAlreadyExist;
}

//여기서부터는 redis없으면 사용안됨 @@@@@@@@@@@@@@@@@@@
//2. 이메일 랜덤코드 발송 - void(email)
function sendRandomCodeToEmail(email){
	$.ajax({
		type:"POST",
		url:serverURL+"/email/verification/request",
		contentType:'application/json; charset=utf-8',
		data:JSON.stringify({
			email:email
		}),
		success:function(e){
			console.log("전송 성공");
		},error:function(e){
			console.log(e);
		}
	});
}

//3. 이메일 랜덤코드 검증- boolean(email,code)
//(일단 db에 3분으로 설정해놔서 그때 지나면 못함)
// 유효할 시 true / 아닐 시 false
function isRandomCodeIsValid(email,code){
	var isEmailValid=false;
	$.ajax({
		type:"POST",
		url:serverURL+"/email/verification",
		contentType:'application/json; charset=utf-8',
		data:JSON.stringify({
			email:email,
			code:code
		}),
		async:false,
		success:function(e){
			isEmailValid=true;
		},error:function(e){
			if(e.status==400){
				console.log("코드가 다릅니다.");
			}else if(e.status==404){
				console.log("코드가 만료되었습니다.");
			}else {
				console.log('코드의 형식이 이상합니다.');
			}
		}
	});
	return isEmailValid;
}

//4.timer(class가 timer여야함)
//isEmailValid가 필요함
function setTimer(second){
	var timer=$('.timer');
	timer.show();
	
	let h=Math.floor(second/60);
	let m=second%60;
	let time=`${h} : ${m<10?"0"+m:m}`
	
	timer.html(time);	
	var timerLogic=setTimeout(()=>setTimer(second-1),1000);
	if(second==0 || isEmailValid){
		clearTimeout(timerLogic);
		timer.hide();
	}
}
		

