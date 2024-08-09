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
                window.location.href = `/list?date=${nowDay.toISOString().slice(0, 10)}`;
            } else {
                openInputModal(nowColumn, nowDay.getDate());
            }
        });
        
        /*
		// 로컬 스토리지에서 임시 저장된 내용 불러오기
        let savedContent = localStorage.getItem(nowDay.toISOString().slice(0, 10));
        if (savedContent) {
            let randomColor = getRandomColor();
            let contentsDiv = nowColumn.querySelector('.contents');
            contentsDiv.innerHTML = `<blockquote style="border-left: 4px solid ${randomColor};">${savedContent}</blockquote>`;
            
            // 블록 인용 클릭 이벤트 핸들러 추가
            contentsDiv.querySelector('blockquote').addEventListener('click', function (e) {
                e.stopPropagation(); // td 클릭 이벤트와의 충돌 방지
                
                let clickedContent = this.textContent;
                modal.style.display = 'block';
                $('#modal-date').html(`<div class="select-dt">${nowDay.getDate()}</div>`);
                $(".input-title").val(clickedContent);
                $(".diary-box").val(clickedContent);
            });
        }
        */
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
        modal.style.display = 'block';
        $('#modal-date').html(`<div class="select-dt">${$(this).closest('td').find('.date').text()}</div>`);
        $(".diary-box").val(clickedContent);
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
	
    if ( !diaryTitle|| !diaryContent ) {
        Swal.fire({
            text: '내용을 입력하세요.',
            icon: 'error',
            confirmButtonText: '확인'
        });
        return; // 조건을 만족하지 않으면 함수 종료
    }
    
	let randomColor = getRandomColor();
	let contentsDiv = $(selectDt).children('.contents');
	let blockquotes = contentsDiv.children('blockquote');
	
	if (blockquotes.length >= 2) {
        let showMoreBtn = contentsDiv.children('.show-more-btn');
        if (showMoreBtn.length === 0) {
            contentsDiv.append(`<button class="show-more-btn">...</button>`);
        }
    } else {
        contentsDiv.append(`<blockquote style="border-left: 4px solid ${randomColor}; margin : 5px 0;">${diaryContent}</blockquote>`);
    }
    
    contentsDiv.children('.show-more-btn').click(function(e) {
        e.stopPropagation(); // td 클릭 이벤트와의 충돌 방지
        let blockquotes = contentsDiv.children('blockquote');
        blockquotes.toggle(); // toggle visibility of blockquotes
        $(this).text(blockquotes.is(':visible') ? '...' : 'Show more'); // toggle button text
    });

	/*
	// 로컬 스토리지에 저장
	let dateKey = selectDt.querySelector('.date').textContent;
	let fullDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), dateKey).toISOString().slice(0, 10);
	localStorage.setItem(fullDate, diaryContent);
	*/
	   
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

/*
$(".diary-box").keydown(function(e) { // 누르는 순간
	if (e.keyCode === 13) {
		modal.style.display = "none";
		let imgBox = document.getElementById('img-box');
		let inImg = document.querySelector('.in-modal-imoticon');
		let modalDt = document.getElementById('modal-date');
		let selDt = document.querySelector('.select-dt');

		modalDt.removeChild(selDt);
		imgBox.removeChild(inImg);
		$(".input-title").val("");
		$(".diary-box").val("");
	}
})

$("#closeBtn").click(function() {
	$(selectDt).children('.contents').empty();
	modal.style.display = 'none';
	
	let modalDt = document.getElementById('modal-date');
	let selDt = document.querySelector('.select-dt');
        
	modalDt.removeChild(selDt);
	$(".input-title").val("");
	$(".diary-box").val("");
})
*/