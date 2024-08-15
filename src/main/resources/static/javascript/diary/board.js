var data;
var searchHist;
$(document).ready(function() {
	$('.dropdown-content').hide();
 	makeComponent();
 	drawCategory();
 	function makeComponent(){
		const searchParams=new URLSearchParams(window.location.search)
		if(searchParams.has('query') || searchParams.has('tags')){
			data=ajaxGetFunction("/api/diary/timeline?query="+searchParams.get('query')+"&tags="+searchParams.get('tags'));
		}else{
			data=ajaxGetFunction("/api/diary/timeline");
		}
		
		var gridContainer=$('.grid-container');
		data.forEach(function(e,i){
			let gridHtml=`
				<div class="grid-item" >
		       		<img src="${e.photo}" loading="lazy" data-diaryId="${e.diaryId}">
		       		<div class="description" data-diaryId="${e.diaryId}">${e.title} </div>
		       		<button type="button"class="heart">
		       			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart" viewBox="0 0 16 16">
						  <path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"/>
						</svg>
		       		</button>
		       </div>
			`
			gridContainer.append(gridHtml);
		})
		var searchHist=JSON.parse(getLocalData("history"));
		console.log(searchHist);
		$('.dropdown-content').append(
			`
			<div class="dropdown-component">
		 		 <span>
				 	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
					  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
					  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
					  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
					</svg>
				 </span>
		 		 <a href="#">Option 3</a>
		 		 <button class="btn btn-secondary" data-search="" onclick="deleteRecentSearch()"> 
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
					  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
					  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
					</svg>
				</button>
		 	</div>
			`
		)
	}
	$('.grid-item').on('click',(e)=>{
		location.href="/timeline/detail?diaryId="+e.target.dataset.diaryid;
	})	

	$('.searchBox').on('click',(e)=>{
		$('.dropdown-content').show();
	})
	
	$('.searchBox').on('focusout',(e)=>{
		$('.dropdown-content').hide();
	})
	
	$('.heart').on('click',function(e){
		$(this).toggleClass('active');
		var heartSvg=$(this).children()
		
		if($(this).hasClass('active')){
			heartSvg.html('<path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386"/>');
		}else{
			heartSvg.html('<path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"/>')
		}
	})
	
}); //end of document.ready

function searchProcess(){
	var search=$('.searchBox').val();
	var alarmPop=$('.searchBtn');
	if(search.length<2){
		console.log()
		alarmPop.popover();
		alarmPop.show();
		setTimeout(function(){alarmPop.popover('hide')}, 1500);
		return false;
	}
	//최근검색어에 저장
	searchHist=JSON.parse(getLocalData("history"));
	if(searchHist==null){
		let setHist=[];
		setHist.push(search);
		setLocalData('history',setHist);
	}else if(searchHist.length==5){
		searchHist[0]=search;
		setLocalData('history',searchHist);
	}else{
		searchHist.push(search);
		setLocalData('history',searchHist);
	}
	
	//쿼리문 보내기
	location.href="/timeline?query="+search+"&tags="+$('input[name="tag"]').val();
}





//태그관리---------------------------------------------
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