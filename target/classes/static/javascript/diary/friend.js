let nowMonth = new Date();
let today = new Date();

// 사용할 색상 배열
const colors = ["#ffcd69", "#5e9de6", "#9fd477", "#ed87bd", "tomato", "#ed5565"];
let lastColor = null;

function getRandomColor() {
    let newColor;
    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === lastColor);
    lastColor = newColor;
    return newColor;
}

// 달력 생성 메서드.
function buildCalendar() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[nowMonth.getMonth()];
    console.log(month);

    // 이번 달의 1일
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);

    // 이번 달의 마지막일 (0)
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1, 0);

    let tbody = document.querySelector("tbody");
    document.getElementById("cal-year").innerText = nowMonth.getFullYear();
    document.getElementById("cal-month").textContent = month;
    console.log(month)
    
    // 이전 출력 결과 초기화
    while (tbody.rows.length > 0) {  
        tbody.deleteRow(tbody.rows.length - 1);
    }

    // 첫번 째 행 추가
    let nowRow = tbody.insertRow();

    // 1일 시작 전까지 빈 열 추가
    for(let j = 0; j < firstDate.getDay(); j++) {
        let nowColumn = nowRow.insertCell();
    }

    for(let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate()+1)) {
        let nowColumn = nowRow.insertCell(); // 새로운 열 추가
        nowColumn.innerHTML = "<div class='date'>"+nowDay.getDate()+"</div><div class='contents'><div>";

		console.log("Current Date: ", nowDay);
		
       // 일요일 : 빨간색, 토요일 : 파란색
       if(nowDay.getDay() == 0){
			nowColumn.style.color = "tomato";
       } else if(nowDay.getDay() == 6) {
			nowColumn.style.color = "royalblue";
			nowRow = tbody.insertRow(); // 토요일일 경우 다음으로 넘어가야 하므로 다시 열 추가
       }
       
       nowColumn.addEventListener('click', function () {
			if (nowColumn.querySelector('.modal-img')) {
                window.location.href = `list.html?date=${nowDay.toISOString().slice(0, 10)}`;
            } else {
                openInputModal(nowColumn, nowDay.getDate());
            }
        });
    }    
	// 마지막 날 이후 빈 열 추가
    while (nowRow.cells.length < 7) {
        nowRow.insertCell();
    }
    
	$("td").click(function() {
		modal.style.display = 'block';
        
        let textDt = $(this).children('.date').text();
        selectDt = this;
        console.log(`선택된 날짜 변수 : ${selectDt}`);
        
        // 모달에 날짜 출력
        $('#modal-date').html(`<div class="select-dt">${textDt}</div>`);
        
        // 새 모달 클릭 시 기존 내용 비우기
        $(".input-title").val('');
        $(".diary-box").val('');
    });
    
    $("td .contents blockquote").click(function (e) {
        e.stopPropagation(); // td 클릭 이벤트와의 충돌 방지
        let clickedContent = $(this).text();
        let $clickedElement = $(this);
        
        modal.style.display = 'block';
        $('#modal-date').html(`<div class="select-dt">${$(this).closest('td').find('.date').text()}</div>`);
        $(".diary-box").val(clickedContent);
        
        // 삭제 버튼이 없으면 추가
	    $('.modal-content').append('<button id="delete-post" class="delete-post">Delete Post</button>');
	
	    // 삭제 버튼 클릭 이벤트 추가
	    $('#delete-post').off('click').on('click', function() {
	        if (confirm('Are you sure you want to delete this post?')) {
	            $clickedElement.closest('td').remove(); // 게시글이 포함된 td 요소 삭제
	            modal.style.display = 'none'; // 모달 닫기
	        }
	    });
    });
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}

// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}
buildCalendar();

// 모달 
const closeBtn = document.getElementById('line-box');
const modalCloseBtn = document.getElementById('closeBtn');
const modal = document.getElementById('modalWrap');

let selectDt;

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// 저장 버튼 클릭 시 내용 저장 및 셀에 표시
function goToDiary() {
    let diaryTitle = $(".input-title").val();
    let diaryContent = $(".diary-box").val();

    if (!diaryTitle || !diaryContent) {
        Swal.fire({
            text: '내용을 입력하세요.',
            icon: 'error',
            confirmButtonText: '확인'
        });
        return; // 조건을 만족하지 않으면 함수 종료
    }

    let randomColor = getRandomColor();
    let contentsDiv = $(selectDt).children('.contents');

    // 새로운 블록 인용 추가
    contentsDiv.append(`<blockquote style="border-left: 4px solid ${randomColor}; margin: 3px 0;">${diaryContent}</blockquote>`);

    let blockquotes = contentsDiv.children('blockquote');

    // **여기서는 td에서만 blockquote를 숨김**
    blockquotes.each(function(index) {
        if (index < 2) {
            $(this).show();  // 첫 두 개만 표시
        } else {
            $(this).hide();  // 세 번째부터는 숨김
        }
    });

    if (blockquotes.length > 2) {
        let showMoreBtn = contentsDiv.children('.show-more-btn');
        if (showMoreBtn.length === 0) {
            contentsDiv.append(`<a class="show-more-btn" style="margin:0;">...</a>`);
        }
    }

    // show-more-btn 클릭 이벤트 처리
    contentsDiv.children('.show-more-btn').off('click').on('click', function(e) {
        e.stopPropagation(); // td 클릭 이벤트와의 충돌 방지

        let indexModalBody = $('#index-modal-body');
        indexModalBody.empty(); // 이전의 컨텐츠 비움

        // **이 부분이 수정됨**: indexModal에 모든 blockquote를 표시
        contentsDiv.children('blockquote').each(function() {
            let originalBlockquote = $(this); // 원본 blockquote 참조
        	let clonedBlockquote = originalBlockquote.clone();
            clonedBlockquote.show(); // 숨겨진 blockquote를 표시하게 강제

            // 각 blockquote마다 새로운 삭제 버튼 생성
            let deleteButton = $('<img>').attr('src', '/image/icons/delete.svg').attr('alt', 'Delete Icon').attr('class','delete-index');
            
            deleteButton.click(function(e) {
	            e.stopPropagation(); // blockquote 클릭 이벤트와의 충돌 방지
	            clonedBlockquote.remove(); // 모달에서 blockquote 삭제
	            originalBlockquote.remove(); // td에서도 원본 blockquote 삭제
	            
	            // td의 blockquote 갱신
            	updateTdBlockquotes(contentsDiv);
	        });

            clonedBlockquote.append(deleteButton);

            clonedBlockquote.click(function(e) {
	            e.stopPropagation(); // td 클릭 이벤트와의 충돌 방지

			    // deleteButton을 제외한 blockquote의 순수 텍스트만 가져오기
			    let clickedContent = $(this).clone() // 복제하여 원본은 유지
			                              .children('img.delete-index').remove().end() // 삭제 버튼 제거
			                              .text(); // 텍스트만 가져오기
			
			    let textDt = $(selectDt).find('.date').text(); // 날짜 정보 가져오기
			
			    indexModal.style.display = 'none';
			    modal.style.display = 'block';
			    $('#modal-date').html(`<div class="select-dt">${textDt}</div>`);
			    $(".input-title").val(clickedContent);
			    $(".diary-box").val(clickedContent); // 작성된 내용 반영
	        });
            indexModalBody.append(clonedBlockquote);
        });

        // 모달을 열기
        $('#indexModal').css('display', 'block');
    });
    
    function updateTdBlockquotes(contentsDiv) {
	    let blockquotes = contentsDiv.children('blockquote');
	
	    // 화면에 표시될 blockquote를 두 개로 제한하고, 나머지는 숨김
	    blockquotes.each(function(index) {
	        if (index < 2) {
	            $(this).show();  // 첫 두 개만 표시
	        } else {
	            $(this).hide();  // 세 번째부터는 숨김
	        }
	    });
	
	    // 만약 blockquote가 두 개 이하라면 "..." 버튼 삭제
	    if (blockquotes.length <= 2) {
	        contentsDiv.children('.show-more-btn').remove();
	    }
	}

    $('#close-icon').click(function() {
        $('#indexModal').css('display', 'none');
    });

    // 모달 밖을 클릭했을 때 닫히게 설정
    $(window).click(function(event) {
        if ($(event.target).is('#indexModal')) {
            $('#indexModal').css('display', 'none');
        }
    });

    // 블록 인용 클릭 이벤트 핸들러 추가
    contentsDiv.children('blockquote').last().click(function (e) {
        e.stopPropagation(); // td 클릭 이벤트와의 충돌 방지
        
        let clickedContent = $(this).text();
        modal.style.display = 'block';
        $('#modal-date').html(`<div class="select-dt">${$(this).closest('td').find('.date').text()}</div>`);
        $(".input-title").val(clickedContent);
        $(".diary-box").val(clickedContent);
    });

    modal.style.display = 'none';
    $(".input-title").val("");
    $(".diary-box").val("");
}

$(".diary-box").keydown(function(e) {
	if (e.keyCode === 13) {
		goToDiary();
	}
});

document.getElementById('load-line-box').onclick = function() {
    document.getElementById('loadModalWrap').style.display = 'none';
}