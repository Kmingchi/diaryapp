
var imageLength=0;
const MAX_LENGTH=5;

var mouseX;
var mouseY;

var loadData;
 window.onload=function(){
	drawCategory();
	$('#deleteBtn').hide();
	
	 $('#flexSwitchCheckDefault').on('click',function(){
		var label=$('.isPublic .form-check-label');
		if($(this).is(':checked')){
			label.html('공개');
		}else{
			label.html('비공개');
		}
	})
	
	
	//add component on slide
	//tag.js에 있는 tempStcker로 동적 생성
	var sticker=tempSticker;
	var slide=document.querySelector('.sticker-slide-menu');
	for(let i=0;i<sticker.length;i++){
		slide.innerHTML+=`
			<span class="sticker-header"> Sticker Group ${i+1} </span>
			<ul class="sticker-component component${i}">
		`
		var stickerComponent=document.querySelector('.component'+i);
		for(let j=0;j<sticker[i].length;j++){
			stickerComponent.innerHTML+=`
				<li>
				<label>
					<input type="radio" name="sticker" value="${sticker[i][j]}">
					<img class="sticker-img sticker${i+j}" draggable="false" src=${sticker[i][j]}>
				</label>
				</li>
			`
		}
	}
	
	//add component on grid
	let stickerArray=[].concat(...sticker);
	var grid=document.querySelector('.grid');
	var check=0;
	for(let i=0;i<stickerArray.length;i++){
		if(i%3==0){
			grid.innerHTML+=`
				<div class="d-flex flex-row mb-3 grid-container${check++}">
				</div>
			`
		}
		var gridContainer=document.querySelector('.grid-container'+(check-1));
		gridContainer.innerHTML+=`
			<div class="p-2">
			<label>
				<input type="radio" name="sticker" value="${stickerArray[i]}">
				<img class="sticker-img sticker${i}" src="${stickerArray[i]}" >
			</label>
			</div>
		`;
	}


	//슬라이드 효과
 $(document).on('click','span',function(){
	 if($('li').css('display')=='block' && $('li')!=this){
		 $('li').slideDown(200);
	 }
	 var li=$(this.nextSibling.nextSibling)
	if(li.css('display')=='block')
		li.slideUp(200);
	else
		li.slideDown(200);
 });
//그리드 선택
 $(document).on('click','button#grid',function(){
	 $('.sticker-option-button').css('background-color','#E2E2E2');
	 $(this).css('background-color','#adb5bd');
	 
	 $('.sticker-slide-menu').hide();
	 $('.grid').slideDown(200);
 });
 //슬라이드 선택
  $(document).on('click','button#slide',function(){
	  $('.sticker-option-button').css('background-color','#E2E2E2');
	 $(this).css('background-color','#adb5bd');
	 
	 $('.grid').hide();
	 $('.sticker-slide-menu').show();
 });
 //라벨 공개/비공개 처리
  $(document).on('click','.isPublic .form-check-label',function(){
	var checkbox=$('.isPublic input');
	if(checkbox.is(':checked')){
		$(this).html('공개')
	}else{
		$(this).html('비공개');
	}
 });
 	
	//데이터가 있는지 확인
	const searchParams=new URLSearchParams(window.location.search)
	if(searchParams.has('temp')){
		data=ajaxGetFunction('/diary/temp/storageId?storageId='+searchParams.get('temp'));
		console.log(data);
		
		$('input[name="title"]').val(data.title);
		document.querySelector("trix-editor").editor.insertHTML(data.content);
	}
 	imageLength=$('figure').length;
}//end of window.onload
//임시저장 관리
var isTempClicked=false;
//그냥 css효과 추가
function tempClicked(){
	var tempLoad=$('.tempLoad');
	var tempSave=$('.tempSave');
	var tempMother=$('.tempMother');
	if(!isTempClicked){
		tempLoad.css('display','block');
		tempSave.css('display','block');
		tempMother.html('X');
	}else{
		tempLoad.css('display','none');
		tempSave.css('display','none');
		tempMother.html('임시저장');
	}
	isTempClicked=!isTempClicked
}
//임시저장 불러오기 
function tempLoad(){
	loadData=ajaxGetFunction('/diary/temp');
	$('.tempOffBody').html('');
	loadData.forEach(function(e){
		let loadhtml=`
			<div class="temp">	
				<div class="tempHead">
					<a href="/write?temp=${e.storage_id}">
						${e.title}
					</a>
				</div>
				<span class="tempDate">
					마지막으로 수정된 날짜 : ${e.date}
				</span>
				<button class="trashcan btn btn-secondary" onclick="deleteTemp(${e.storage_id})">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
					  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
					  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
					</svg>
				</button>
			</div>
			`;
		$('.tempOffBody').append(loadhtml);
	})
}
//임시 저장하기
function tempSave(){
	if(!isContentAndTitleNotEmpty()){
		alert("제목과 내용을 입력해주세요");
		return;
	}
	let data={
		"title":$('input[name="title"]').val(),
		"content":$('input[name="content"]').val(),
	}
	if(loadData.length==3){
		alert('임시 저장은 최대 3개까지 가능합니다.');
		return;
	}
	ajaxPostFunction('/diary/temp',JSON.stringify(data));
	loadData=ajaxGetFunction('/diary/temp');
}
let isCalled=0;
let lastClickTime = 0;
function beforeSubmit(){
	const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;

    // 일정 시간 이내에 다시 클릭한 경우 이벤트를 무시
    if (timeDiff < 500) {
        return;
    }

    lastClickTime = currentTime;
	if(isCalled==1){
		return;
	}
	if(!isPublicCheck()){
		return;
	}
	if(!isContentAndTitleNotEmpty()){
		alert('내용 또는 제목이 비어있습니다.');
		return
	}
	if(imageLength==0){
		//이미지가 없는 경우 무조건 비공개임
		//그냥 바로 저장
		let data={
			"title":$('input[name="title"]').val(),
			"content":$('input[name="content"]').val(),
			"sticker":$('input[name="sticker"]:checked').val(),
			"isPublic":$('input[name="isPublic"]:checked').length,
			"tagString":$('input[name="tag"]').val(),
			"rawString":$('input[name="rawString"]').val(),
		}
		ajaxPostFunction("/api/diary",JSON.stringify(data));
		location.href="/list";
	}else{
		//이미지가 있는 경우 대표이미지 설정
		$('.imageRep').html('');
		
		$('figure img').each(function(i,e){
			var imageRepHtml=`
				<div class="imageRepComponent">
				<label for="photo">
					<input type="radio" id="photo" name="photo" value="${e.currentSrc}">
					<img class="photoImg" style="max-width:270px;" src="${e.currentSrc}">
				</label>
				</div>
			`	
			$('.imageRep').append(imageRepHtml);
		})
		var beforeSubmitBtn=$('.submit button');
		beforeSubmitBtn.attr('data-bs-target','#lastModal');
		isCalled++;
		beforeSubmitBtn.trigger('click');
		setTimeout(()=>{
			isCalled--;
		},1000)
	}
}
function submitProcess(){
	if($('input[name="photo"]:checked').length==0){
		alert("대표 이미지를 선택해주세요");
		return;
	}
	let data={
			"title":$('input[name="title"]').val(),
			"content":$('input[name="content"]').val(),
			"sticker":$('input[name="sticker"]:checked').val(),
			"photo":$('input[name="photo"]:checked').val(),
			"isPublic":$('input[name="isPublic"]:checked').length,
			"tagString":$('input[name="tag"]').val(),
			"rawString":$('input[name="rawString"]').val(),
		}
		ajaxPostFunction("/api/diary",JSON.stringify(data));
		location.href="/list";
}

//trix 에디터 관리
document.addEventListener('trix-attachment-add',(e)=>{
	e.preventDefault();
	if(imageLength>=MAX_LENGTH){
		alert('이미지는 최대 5개까지 추가 가능합니다.');
		return;
	}

	console.log(e.attachment.file);
	
	console.log(e.attachment.previewElement);
	if(e.attachment.file.name.startsWith('&(sticker)@')){
		/*
		const x=mouseX
		const y=mouseY
		imageSetting(x,y,e.attachment);
		*/
	}else{
		uploadImage(e.attachment);
	}
})
document.addEventListener('trix-change',(e)=>{
	var editor = document.querySelector("trix-editor").editor;
	$('input[name="rawString"]').val(editor.getDocument().toString());
})

document.addEventListener('trix-attachment-remove',(e)=>{
	if(imageLength<=0){
		alert('이미지가 없습니다.');
		return;
	}
	const url=e.attachment.getAttribute('url');
	deleteImage(url);
	imageLength--;
})

function uploadImage(attachment) {
	 const formData = new FormData();
	    formData.append("file", attachment.file);
	    $.ajax({
	        url: "/api/google/diary", 
	        type: "POST",
	        data: formData,
	        processData: false,
	        contentType: false,
	        success: function(response) {
	            if (response.url!=null) {
					url=response.url;
	                attachment.setAttributes({
	                    url: response.url,
	                    href: response.url,
	                    caption:""
	                });
	                const editor = document.querySelector("#editor");
                    editor.editor.insertHTML('<br>');
                    imageLength++;
              	   // setTimeout(addRepresentiveImage,500);
	            } else {
	                console.error("Image upload failed.");
	            }
	        },
	        error: function(xhr, status, error) {
	            console.error("Upload error:", error);
	        }
	    });
}
function deleteImage(url){
	$.ajax({
		url:"/api/google/diary",
		type:"DELETE",
		contentType:"application/json",
		data:{url:url},
		success:function(e){
			console.log("성공적으로 삭제됨");
		}, error:function(e){
			console.log("삭제 중 문제 발생");
		}
	})
}

//태그관리 ----------------------------------------------------
//유저가 선택한 태그들이 담기는 배열
//나중에 name=tag 에 값 넘겨줘야됨
var userSelected=[]; 

function drawCategory(){
	//var tags에 태그 지금 다 들어있음
	var categoryDiv=$('.tag-category');
	var categoryHTML='';

	for(let i=0;i<tag_size;i++){
		categoryHTML+=`
			<button type="button" 
					class="btn btn-outline-primary category"
					data-seq='${i}'
					onclick='categorySelected(this)'>
					${tag_keys[i]}
			</button>
			`
	}
	categoryDiv.html(categoryHTML);
}
function categorySelected(Btn){
	var tagDiv=$('.tag-category-content');
	tagDiv.html('');
	var tagHTML='';
	
	var selectedCategory=tag_values[Btn.dataset.seq];
	
	for(let i=0;i<selectedCategory.length;i++){
		tagHTML+=`
			<button type="button" 
					class="btn btn-outline-primary tagBtn ${userSelected.includes(selectedCategory[i])? 'clicked':''}"
					onclick='tagSelected(this)'
					value='${selectedCategory[i]}'>
					${selectedCategory[i]}
			</button>
			`
	}
	$('.category').removeClass('clicked');
	Btn.classList.add('clicked');
	
	tagDiv.html(tagHTML);
}

function tagSelected(Btn){
	if(Btn.classList.contains('clicked')){
		console.log('already clicked');
		Btn.classList.remove('clicked');
		userSelected.splice(userSelected.indexOf(Btn.value),1);
	}else{
		if(userSelected.length<3){
			userSelected.push(Btn.value);
			Btn.classList.add('clicked');
		}else{
			alert('3개를 넘길수는 없어요');
			return;
		}
	}
	tagNotify();
}
function tagNotify(){
	var userTagDiv=$('.tag-userSelected');
	var userTagHTML='';
	
	for(let i=0;i<userSelected.length;i++){
		userTagHTML+=`
			<button type="button" 
				class="btn btn-primary"
				id="${userSelected[i]}"
				onclick="deleteTag(this)">
				${userSelected[i]}
			</button>
		`
	}
	userTagDiv.html(userTagHTML);
}
//input[name="tag"]에 데이터 전송
function onTagSelectBtnClicked(){
	$('input[name="tag"]').val(userSelected);
	
	console.log($('input[name="tag"]').val());
}

function deleteTag(Btn){
	userSelected.splice(userSelected.indexOf(Btn.id),1);
	$('#'+Btn.id+'').remove();
	$('button[value="'+Btn.id+'"]').removeClass('clicked');
	tagNotify();
}
//------------------------------------------- 태그관리 끝
 $(document).on('click','.sticker-img',function(){
	 $('.sticker-img').css('border','none');
	 $('input[name="sticker"]').prop('checked',false);
	 
	 $(this).css('border','10px solid blue');
	var stickerRadio=$(this.previousSibling.previousSibling);
	
	stickerRadio.prop('checked',true);
	//몇개 체크되었는지 확인 -- 나중에 삭제
	console.log($('input[name="sticker"]:checked').length);
 });
 
 $(document).on('click','.photoImg',function(){
	$('.photoImg').css('border','none');
	 $(this).css('border','10px solid blue');
	var imageRadio=$(this.previousSibling.previousSibling);
	
	imageRadio.prop('checked',true);
	console.log($('input[name="photo"]:checked').length);
 });
 //-------------------------
 //자주 쓸만한거 
 //제목이랑 내용 비어있는지 확인
 function isContentAndTitleNotEmpty(){
	var title=$('input[name="title"]').val();
	var content=$('input[name="content"').val();
	if(title.length==0){
		return false;
	}else if(content.length==0){
		return false;
	}else if(title.trim().length==0 || content.trim().length==0){
		return false;
	}
	return true;
 }
//공개로 전환했을때는 반드시 이미지를 1개 이상 추가해야됨
function isPublicCheck(){
	if($('input[name="isPublic"]').is(':checked') && imageLength<=0){
		alert("공개로 설정시에는 이미지를 반드시 1개 추가해야됩니다.");
		return false;
	}
	return true;
}
/*
function userTextInput(textarea){
	var indicator=document.getElementById("contentSize");
	indicator.innerHTML=textarea.textLength+"/1000";
	if(textarea.textLength>=1000){
		indicator.style.color="red";
	}else{
		indicator.style.color="blue";
	}
}

var index=0;
//이미지, 인디케이터,파일태그 전부 초기화하는 함수
function flushAllCarousel(){
	 index=0;
	 const inner=document.querySelector('.carousel-inner');
	 const indicator=document.querySelector('.carousel-indicators');
	//이미지랑 인디케이터 전부 초기화
	  while(inner.firstChild)  {
		  inner.removeChild(inner.firstChild);
		  indicator.removeChild(indicator.firstChild);
	  }
	//파일 태그 완전초기화
	const file=document.getElementById("file");
	var newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.id = file.id;
    newFileInput.name = file.name;
    newFileInput.className = file.className;
    newFileInput.style.cssText = file.style.cssText;
    newFileInput.setAttribute('onchange','fileUploaded(this)');
    newFileInput.setAttribute('multiple',true);
    
    file.parentNode.replaceChild(newFileInput, file);
    
    const fileCheck=document.getElementById("file");
    console.dir(fileCheck);
	
	//캐러셀 컴포넌트 안보이게 설정
	const carouselParent=document.querySelector('.carousel')
	carouselParent.setAttribute('style','display:none');
	
	//svg이미지 보이게 설정
	const svgImg1=document.querySelector(".icon_img_1");
	svgImg1.setAttribute('style','display:block');
	
	$('.preview').css('border','3px solid black');
	$('#deleteBtn').fadeOut(600);
}
//파일 업로드 관리 ------------------------------------------
const MAX_SIZE=10 * 1024 * 1024; //10mb 제한
 function fileUploaded(file){
	if(file.files.length>5){
		alert("이미지는 5개를 초과할 수 없습니다.");
		flushAllCarousel();
		 return;
	}
	 for(let i=0;i<file.files.length;i++){
		 console.log("파일 크기검사")
		 if(file.files[i].size>MAX_SIZE){
			 alert("10mb가 넘는 파일은 올리실 수 없습니다.");
			 flushAllCarousel();
			 return;
		 }
	 }
	 makePreviewImg(file.files);
}

function deleteAllFiles(){
	 flushAllCarousel();
 }
function imagePreviewUsingSlide(input,isActive){
	const reader=new FileReader();
	reader.onload=function(e){
		//이미지 추가
		const carousel=document.createElement("div");
		carousel.classList.add('carousel-item',isActive);
		
		const imgItem=document.createElement('img');
		imgItem.src=e.target.result;
		imgItem.classList.add('d-block','w-100');
		
		carousel.appendChild(imgItem);
		const inner=document.querySelector('.carousel-inner')

		inner.appendChild(carousel);
		//인디케이터 추가
		const indicator=document.querySelector('.carousel-indicators');
		const carouselIndicator=document.createElement('button');
		
		carouselIndicator.setAttribute('type','button');
		carouselIndicator.setAttribute('data-bs-target','#carouselExampleIndicators');
		if(index==0)
			carouselIndicator.setAttribute('class','active');
		carouselIndicator.setAttribute('data-bs-slide-to',index++);
		carouselIndicator.setAttribute('aria-current','true');
		carouselIndicator.setAttribute('aria-label','Slide '+index);
		
		indicator.appendChild(carouselIndicator);
		//carousel 보이게 설정
		const carouselParent=document.querySelector('.carousel')
		carouselParent.setAttribute('style','display:block');
		
		//svg이미지 안보이게 설정
		const svgImg1=document.querySelector(".icon_img_1");
		svgImg1.setAttribute('style','display:none');
		
		$('.preview').css('border','none');
		$('#deleteBtn').fadeIn(200);
	}
	reader.readAsDataURL(input);
}
function makePreviewImg(files){
	flushAllCarousel();
	if(files.length>5){
		alert("이미지는 5개를 초과할 수 없습니다.")
		return;
	}
	for(let i=0;i<files.length;i++){
		if(i==0)
			imagePreviewUsingSlide(files[i],'active');
		else
			imagePreviewUsingSlide(files[i]);
	}
}

 <div class="p-2">
  		<label>
			<input type="radio" class="sticker-radio" value="4">
			 <img class="sticker-img" draggable="true" src="image/sticker/tempGroup3/4.png" >
		</label>
  </div>
  */
//Jquery sortable





 
