var dataTag;
var userInfo;
$(function(){
	const searchParams=new URLSearchParams(window.location.search)
	if(searchParams.has('diaryId')){
		data=ajaxGetFunction("/api/diary/diaryId/"+searchParams.get('diaryId'));
		dataTag=ajaxGetFunction("/api/tag/"+data.diaryId);
		userInfo=ajaxGetFunction("/user/specific/"+data.userId);
		
		console.log(dataTag);
		console.log(userInfo);
	}else{
		console.log("이상한 접근");
		history.back();
	}
	
	fillContentBox();
	
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
		
		$('component-profileId').html(data.nickname);
	}
})//end of window.onload