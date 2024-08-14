var dataTag;
var userInfo;

var commentData;

$(function(){
	const searchParams=new URLSearchParams(window.location.search)
	if(searchParams.has('diaryId')){
		data=ajaxGetFunction("/api/diary/diaryId/"+searchParams.get('diaryId'));
		dataTag=ajaxGetFunction("/api/tag/"+data.diaryId);
		userInfo=ajaxGetFunction("/user/specific/"+data.userId);

		commentData=ajaxGetFunction("/api/comment/"+data.diaryId);
		
		console.log(dataTag);
		console.log(userInfo);
		console.log(commentData);

	}else{
		console.log("이상한 접근");
		history.back();
	}
	
	fillContentBox();
	commentSection();

	function fillContentBox(){
		$(".calendar-date").html(data.date);
		$('.component-title').html(data.title);
		var stickerImg=$('.component-sticker img');
		if(data.sticker!=null){
			stickerImg.attr('src',"/"+data.sticker);
		}else{
			stickerImg.hide();
		}
		$('.component-content').html(data.content);
		
		var tagComponent=$('.component-tag');
		dataTag.forEach((e,i)=>{
			tagComponent.append(
				`<button type="button"  class="btn btn-primary">${e.tagName}</button>`
			)
		})
		

		$('.component-profileId').html(userInfo.nickname);
		$('.component-profileImg img').attr('src',userInfo.profileImage==null?'/image/login/temp_default_img.png':userInfo.profileImage);
	}

	function commentSection(){
		var area;
		let commentHTML
		commentData.forEach(function(e,i){
			let commentInfo=ajaxGetFunction("/user/specific/"+e.userId);
			if(e.commentParentId==0){
				area=$('.comment-area');
				commentHTML=`
				<div class="comment" id="${e.commentId}">
					<span class="comment-profileImg">
						<img src="${commentInfo.profileImage==null?'/image/login/temp_default_img.png':commentInfo.profileImage}">
					</span>
					<span class="comment-nickname">${commentInfo.nickname}</span>
					<span class="comment-delete-icon" data-commentid="${e.commentId}"  data-userid="${e.userId}">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
						  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
						  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
						</svg>
					</span>
					<br>
					<div class="comment-parent-content">${e.text}</div>
					<span class="comment-reply-icon" data-commentid="${e.commentId}">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
						  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
						</svg>
					</span>
				</div>
			`
			area.append(commentHTML);
			}else{
				if($(`.parent${e.commentParentId}`).length){
					area=$(`.parent${e.commentParentId}`).last()
				}else{
					area=$('#'+e.commentParentId);
				}
				commentHTML=`
				<div class="comment reply parent${e.commentParentId}" id="${e.commentId}">
					<span class="comment-profileImg">
						<img src="${commentInfo.profileImage==null?'/image/login/temp_default_img.png':commentInfo.profileImage}">
					</span>
					<span class="comment-nickname">${commentInfo.nickname}</span>
					<span class="comment-delete-icon" data-commentid="${e.commentId}" data-userid="${e.userId}">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
						  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
						  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
						</svg>
					</span>
					<br>
					<div class="comment-parent-content">${e.text}</div>
				</div>
			`
			area.after(commentHTML);
			}
		})
	}
	
	$('#commentInput').on('keydown',(e)=>parentCommentInput(e))
	
	$('.comment-input button').on('click',(e)=>parentCommentInput(e))
	
	$('.comment-reply-icon').on('click',function(e){	
		var parentCommentId=$(this).data('commentid');
		var parent=$('#'+parentCommentId);
		
		$('div').remove('.reply-input');
		
		parent.after(`
			<div class="reply-input">
				<textarea rows="2" cols="30" maxlength="50" style="resize:none;" name="replyText"
						data-parentid="${parentCommentId}"></textarea>
				<button type="button" class="btn btn-success" data-parentid="${parentCommentId}">전송</button>
			</div>
		`);
		
		$('.reply-input textarea').on('keydown',(e)=>ChildCommentInput(e))
	
		$('.reply-input button').on('click',(e)=>ChildCommentInput(e))
	})
	$('.comment-delete-icon').on('click',function(evt){
		var isDelete=confirm("정말로 댓글을 삭제하시겠습니까?");
		var thisData=$(this);
		if(isDelete){
			$.ajax({
				type:"DELETE",
				url:"/api/comment",
				data:{
					commentId:thisData.data('commentid'),
					parentId:thisData.data('userid')
				},
				async:false,
				success:function(e){
					console.log("실행됨");
					window.location.href=location.href;
				}, error:function(e){
					alert("자신이 작성한 댓글만 삭제할 수 있습니다.");
				}
			})
		}
	})
})//end of window.onload


function parentCommentInput(e){
	let inputParentData={
		commentParentId:0,
		commentLayer:1,
		diaryId:data.diaryId,
		text:$('#commentInput').val(),
	}
	dataSend(e,inputParentData);
}
	
function ChildCommentInput(e){
	let inputChildData={
		commentParentId:e.target.dataset.parentid,
		commentLayer:2,
		diaryId:data.diaryId,
		text:$('.reply-input textarea').val()
	}	
	dataSend(e,inputChildData);
}

function dataSend(e,inputData){
	if(e.target.tagName=='BUTTON'){
		if(inputData.text.length==0 || inputData.text=="\n"){
			alert("값을 입력해주세요");
			return;
		}		
		ajaxPostFunction('/api/comment',JSON.stringify(inputData));
		location.href=location.href;
	}
	if(e.keyCode==13 && !e.shiftKey){
		if(inputData.text.length==0 || inputData.text=="\n"){
			alert("값을 입력해주세요");
			return;
		}
		ajaxPostFunction('/api/comment',JSON.stringify(inputData));
		location.href=location.href;
	}
}

