/*
  Ajax요청시에 URL을 한번에 관리하기 위한 자바스크립트
  배포할때는 localhost가 아니라 ip나 도메인으로 url변경해야됨
 */
//ip + port
const ipOrDomain="localhost";
const PORT=8080;

//기본 요청 url
 const serverURL=`http://${ipOrDomain}:${PORT}`

//일일이 요청 만들기 귀찮아서 만든 요청js
//이름 최대한 안겹치게 하려고 좀 길어질 수 있음
//jquery import해야됨
//url을 보낼때는 루트 패스로만 보내면 됨(ex : /diaryy)


//비동기식
function ajaxPostFunction(requestUrl, data){
	//data는 뭐 생략할 수 있음
	var returnData;
	$.ajax({
		type:"POST",
		url:serverURL+requestUrl,
		contentType:'application/json; charset=utf-8',
		data:data,
		async:false,
		success:function(e){
			console.log(e)
			returnData=e;
		},error:function(e){
			console.log(e)
		}
	})
	return returnData;
}
//비동기식
function ajaxGetFunction(requestUrl, data){
	//data는 뭐 생략할 수 있음
	var returnData;
	$.ajax({
		type:"GET",
		url:serverURL+requestUrl,
		data:data,
		async:false,
		success:function(e){
			console.log(e)
			returnData=e;
		},error:function(e){
			console.log(e)
		}
	})
	return returnData;
}
