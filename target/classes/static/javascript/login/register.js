var isEmailValid=false;
var isIdValid=false
var isNicknameValid=false;
var errorMsg=$('.input-error-msg');
var emailCheckedSymbol=$('.email-checked-symbol');
var idCheckedSymbol=$('.id-checked-symbol');
var usernameCheckedSymbol=$('.username-checked-symbol');
	
var timer=$('.timer');

//공백이 있는지 확인하는 정규식
var blank_pattern = /[\s]/g;

$(document).ready(function(){
	errorMsg.hide();
	emailCheckedSymbol.hide();
	idCheckedSymbol.hide();
	usernameCheckedSymbol.hide();
	timer.hide();
})
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
function userIdInput(){
	idCheckedSymbol.hide();
	isIdValid=false;
}
function userEmailInput(){
	emailCheckedSymbol.hide();
	isEmailValid=false;
}
function usernameInput(){
	usernameCheckedSymbol.hide();
	isNicknameValid=false;
}


function registerValidation(){
	var password=$('#password').val();
	var repassword=$('#repassword').val();
	
	//제출시 검증 작업을 진행
	if(!isIdValid){
		errorMsg.html("<b>아이디</b> 중복확인을 해주세요");
		errorMsg.show();
		return false;
	}
	if(!isEmailValid){
		errorMsg.html("<b>이메일</b> 인증을 해주세요");
		errorMsg.show();
		return false;
	}
	if(!isNicknameValid){
		errorMsg.html("<b>닉네임</b> 인증을 해주세요");
		errorMsg.show();
		return false;
	}
	if(password==''){
		errorMsg.html("<b>비밀번호</b>를 입력해주세요");
		errorMsg.show();
		return false
	}else if(password.length<4 || password.length>20){
		errorMsg.html("<b> 비밀번호</b>는 4~20글자 내로 입력해야 합니다.");
		errorMsg.show();
		return false			
	}else if(blank_pattern.test(password)==true){
		errorMsg.html("<b> 비밀번호</b>에 공백이 있습니다.");
		errorMsg.show();
		return false
	}else if(password!=repassword){
		errorMsg.html("<b>확인 비밀번호</b>가 다릅니다.");
		errorMsg.show();
		return false
	}
	return true;
}

function idValidationProcess(){
	const idReg = /^[A-Za-z][A-Za-z0-9]{3,11}$/;
	if(isIdValid){
		alert("이미 인증된 아이디입니다.");
		return;
	}
	var id=$('input[name="id"]');
	console.log(id.val());
	//1. 아이디가 비어있는지 확인
	if(id.val()==''){
		errorMsg.html("<b>아이디</b>를 입력해주세요");
		errorMsg.show();
		return;
	}
	if(!idReg.test(id.val())){
		errorMsg.html("<b>아이디</b>는 영어로 시작하는 영어/숫자만 입력가능합니다.");
		errorMsg.show();
		return;
	}
	if(id.val().length<4 || id.val().length>12){
		errorMsg.html("<b>아이디</b>는 4~12자만 입력가능합니다.");
		errorMsg.show();
		return;			
	}
	console.log(id.val());
	//2. 아이디가 중복되는지 확인(ok뜨면 중복된거임)
	$.ajax({
		type:"GET",
		url:serverURL+"/user/verification/id?id="+id.val(),
		success:function(e){
			errorMsg.html("<b>아이디</b>가 중복됩니다.");
			errorMsg.show();
		},error:function(e){
			errorMsg.hide();
			idCheckedSymbol.fadeIn(600);
			isIdValid=true;
		}
	});
}
function emailValidationProcess(){
	if(isEmailValid){
		alert("이미 인증된 이메일입니다.");
		return;
	}
	var email=$('input[type="email"]')
	//1. 이메일이 형식에 맞는지 확인
	if(email.val()==''){
		errorMsg.html("<b>이메일</b>을 입력해주세요.");
		errorMsg.show();
		return;
	}
	var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if(!email_regex.test(email.val())){ 
		errorMsg.html("<b>이메일</b> 형식이 올바르지 않습니다.");
		errorMsg.show();
		return;
	}
	//2. 이메일 중복확인 작업 진행
	//여기는 동기처리를 진행해야됨
	var emailAlreadyExist=false;
	$.ajax({
		type:"GET",
		url:serverURL+"/user/verification/email?email="+email.val(),
		async:false,
		success:function(e){
			emailAlreadyExist=true;
			errorMsg.html("<b>이메일</b>이 중복됩니다.");
			errorMsg.show();
		},error:function(e){
			errorMsg.hide();
		}
	});
	console.log("email Exist? : "+emailAlreadyExist);
	if(emailAlreadyExist){
		console.log("이메일이 중복되어 탈출합니다.");
		return;
	}
		
	//3. 이메일 검증 작업 진행
	document.getElementById("email-check").disabled=false;
	document.getElementById("email-checkBtn").disabled=false;
	
	$.ajax({
		type:"POST",
		url:serverURL+"/email/verification/request",
		contentType:'application/json; charset=utf-8',
		data:JSON.stringify({
			email:email.val()
		}),
		success:function(e){
			console.log("전송 성공");
			setTimer(180);
		},error:function(e){
			console.log(e);
		}
	});
}

function emailVerificationProcess(){
	//이메일 인증번호 확인 작업을 진행
	var verifyNumber=$('#email-check').val();
	var email=$('input[type="email"]').val();
	$.ajax({
		type:"POST",
		url:serverURL+"/email/verification",
		contentType:'application/json; charset=utf-8',
		data:JSON.stringify({
			email:email,
			code:verifyNumber
		}),
		success:function(e){
			console.log("인증 성공");
			console.log(e);
			
			$('.email-checked-symbol').fadeIn(600);
			$('#email-check').attr('disabled',true);
			$('#email-checkBtn').attr('disabled',true);
			timer.hide();
			errorMsg.hide();
			isEmailValid=true;
		},error:function(e){
			//메시지가 틀리면 400에러 만료되면 404에러 뜨게 설정해둠, 500에러는 빈칸이거나 그러면 뜨는듯?
			if(e.status==400){
				errorMsg.html('<b>인증 번호</b>가 다릅니다.');
			}else if(e.status==404){
				errorMsg.html('<b>인증 번호</b>가 만료되었습니다. 다시 인증해주세요');
			}else {
				errorMsg.html('<b>인증 번호</b>가 올바르지 않습니다.');
			}
			errorMsg.show();
		}
	});
}

function nicknameValidationProcess(){
	var nickname=$('input[name="nickname"]').val();
	if(blank_pattern.test(nickname)){
		errorMsg.html("<b>닉네임</b>에 공백이 있습니다.");
		errorMsg.show();
		return;
	}
	if(nickname.length<2 || nickname.length>20){
		errorMsg.html("<b>닉네임</b>은 2~20자 사이를 입력해야됩니다. ");
		errorMsg.show();
		return;		
	}
	
	$.ajax({
		type:"GET",
		url:serverURL+"/user/verification/nickname?nickname="+nickname,
		success:function(e){
			errorMsg.html("<b>닉네임</b>이 중복됩니다.");
			errorMsg.show();
		},error:function(e){
			errorMsg.hide();
			usernameCheckedSymbol.fadeIn(600);
			isNicknameValid=true;
		}
	});
}
	
	
function fileUploaded(file){
	previewImg(file.files[0]);
}
function previewImg(input){
	const reader=new FileReader();
	reader.onload=function(e){
		document.getElementById('preview').src=e.target.result;
	}
	reader.readAsDataURL(input);
}
window.onload=function(){
	var imgPreview=document.getElementById('preview-box');
	imgPreview.addEventListener(
		"dragover",(e)=>{
			e.preventDefault();
		}		
	)
	imgPreview.addEventListener(
		"drop",(e)=>{
			e.preventDefault();
			
			const files=[ ... e.dataTransfer?.files];
			previewImg(files[0]);
			
			const fileTag=document.getElementById("file");
			
		     var dataTransfer = new DataTransfer();
	        files.forEach(file => dataTransfer.items.add(file));
	        
	        fileTag.files = dataTransfer.files;
		}		
	)
}