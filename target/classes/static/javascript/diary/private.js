let nowMonth = new Date();
let today = new Date();
let diaryEntries = {};	// 각 날짜의 글 갯수를 저장하는 객체
let isGoToDiaryUsed = false;	// goToDiary() 함수가 사용되었는지 확인하는 전역 변수

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
		nowColumn.innerHTML = nowDay.getDate();
		nowColumn.innerHTML = "<div class='date'>"+nowDay.getDate()+"</div><div class='contents'><div>";

	   // 일요일 : 빨간색, 토요일 : 파란색
		if(nowDay.getDay() == 0){
			nowColumn.style.color = "tomato";
		} else if(nowDay.getDay() == 6) {
			nowColumn.style.color = "royalblue";
			nowRow = tbody.insertRow(); // 토요일일 경우 다음으로 넘어가야 하므로 다시 열 추가
		}
	}
}

// 입력 모달 열기 함수
function openInputModal(cell, date) {
    selectDt = cell;
    textDt = date;
    modal.style.display = 'block';
    
    document.getElementById('todo-input').value = '';
    document.getElementById('todo-list').innerHTML = '';
}

// 이전달 버튼 클릭
function prevCalendar() {
	nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
	buildCalendar();	// 달력 다시 생성
}

// 다음달 버튼 클릭
function nextCalendar() {
	nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
	buildCalendar();	// 달력 다시 생성
	console.log(nowMonth);
}
buildCalendar();


// 모달 
const closeBtn = document.getElementById('line-box');
const modalCloseBtn = document.getElementById('closeBtn');
const modal = document.getElementById('modalWrap');
const thead = document.getElementsByTagName('thead');

let selectDt;
let selectDay;

$("tbody").on("click", "td", function() {
    const dateKey = $(this).children('.date').text();
    const detailModal = document.getElementById('detailModalWrap');
    const modal = document.getElementById('modalWrap');
    const todoList = document.getElementById('todo-list');
    if ($(this).children('.contents').children('img').length > 0) {
    	if (isGoToDiaryUsed) {
            window.location.href = '/list'; // goToDiary()에서 작성한 경우 list.html로 이동
        } else {
	        $('#detail-modal-date').text(dateKey + '일');
	        $('#detail-img-box').html($(this).children('.contents').html());
	        detailModal.style.display = 'block';
	        modal.style.display = 'none';
	    }
    } else {
	    detailModal.style.display = 'none';
	    modal.style.display = 'block';
	    todoList.innerHTML = '';
	}
    textDt = dateKey;
    selectDt = this;
});
console.log($(selectDt).children('.date').text());

closeBtn.onclick = function() {
	modal.style.display = 'none';
}

const smileBtn = document.getElementById('smile');
const sadBtn = document.getElementById('sad');
const excitedBtn = document.getElementById('excited');
const angryBtn = document.getElementById('angry');
const relaxBtn = document.getElementById('relax');
const wowBtn = document.getElementById('surprised');
const writeModal = document.getElementById('modalWrap-2');

// 기쁨 이모티콘
	smileBtn.onclick = function() {
		modal.style.display = 'none'; // 처음 이모지 모달은 없애기
		writeModal.style.display = 'block'; // 작성 모달
		setImg("smile");
	}

// 슬픔 이모티콘
	sadBtn.onclick = function() {
		modal.style.display = 'none';
		writeModal.style.display = 'block';
		setImg("sad");
	}

// 기대 이모티콘
	excitedBtn.onclick = function() {
		modal.style.display = 'none';;
		writeModal.style.display = 'block';
		setImg("excited");
	}

// 화남 이모티콘
	angryBtn.onclick = function() {
		modal.style.display = 'none';
		writeModal.style.display = 'block';
		setImg("angry");
	}

// 평온 이모티콘
	relaxBtn.onclick = function() {
		modal.style.display = 'none';
		writeModal.style.display = 'block';
		setImg("relax");
	}

// 놀람 이모티콘
	wowBtn.onclick = function() {
		modal.style.display = 'none';
		writeModal.style.display = 'block';
		setImg("surprised");
	}

	$(".diary-box").keydown(function(e) { // 누르는 순간
		if (e.keyCode === 13) {	        
			writeModal.style.display = "none";
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

	function setImg(img) {
		const dateKey = selectDt.querySelector('.date').innerText;
	
	    if (!diaryEntries[dateKey]) {
	        diaryEntries[dateKey] = 0;
	    }
	    diaryEntries[dateKey]++;
	    
	    const imgSrc = `/image/emoji/${img}.png`;
	    $(selectDt).children('.contents').append(`<img class="modal-img" src="${imgSrc}" />`);
	    $('#img-box').html(`<img class="in-modal-imoticon" src="${imgSrc}" />`);
	    $('#modal-date').html(`<div class="select-dt">${dateKey}일</div>`);
	
	    selectedEmoji = imgSrc; // 선택된 이모티콘을 전역 변수에 저장
	    selectedDate = dateKey; // 선택된 날짜를 전역 변수에 저장
 
		updateChallengeIcon();
	}

	// 게시글 작성 갯수에 따라 변화
	function updateChallengeIcon() {
    const totalEntries = Object.values(diaryEntries).reduce((a, b) => a + b, 0);
    const iframe = document.querySelector("iframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const challengeIcon = iframeDocument.getElementById('challenge-icon');
    
	    if (totalEntries >= 26) {
	        challengeIcon.src = "/image/icons/temp05.svg";
	    } else if (totalEntries >= 21) {
	        challengeIcon.src = "/image/icons/temp04.svg";
	    } else if (totalEntries >= 14) {
	        challengeIcon.src = "/image/icons/temp03.svg";
	    } else if (totalEntries >= 7) {
	        challengeIcon.src = "/image/icons/temp02.svg";
	    } else {
	        challengeIcon.src = "/image/icons/temp01.svg";
	    }
	}
	
	$("#closeBtn").click(function() {
		$(selectDt).children('.contents').empty();
		writeModal.style.display = 'none';

		let imgBox = document.getElementById('img-box');
		let inImg = document.querySelector('.in-modal-imoticon');
		let modalDt = document.getElementById('modal-date');
		let selDt = document.querySelector('.select-dt');
		
		if (selDt && modalDt.contains(selDt)) {
        	modalDt.removeChild(selDt);
	    }
	    if (inImg && imgBox.contains(inImg)) {
	        imgBox.removeChild(inImg);
	    }
    
		$(".input-title").val("");
		$(".diary-box").val("");
	})
	
	const detailCloseBtn = document.getElementById('closeDetailBtn');
	detailCloseBtn.onclick = function() {
	    const detailModal = document.getElementById('detailModalWrap');
	    detailModal.style.display = 'none';
	}
	
	/* todolist add btn */
	function addTodo() {
	    const todoInput = document.getElementById('todo-input');
	    const todoList = document.getElementById('todo-list');
	
	    if (todoInput.value.trim() === '') {
			Swal.fire({
				icon: "error",
				html: "할 일을 입력하세요!"
			});
	        return;
	    }
	    
	    // 로컬 스토리지에 저장
	    /*
	    localStorage.setItem('todo', todoInput.value);
		todoInput.value = '';
		*/

	    const li = document.createElement('li');
	    li.textContent = todoInput.value;	// 최근에 입력한 todo-list 데이터
	    todoList.appendChild(li);
	    
	    todoInput.value = '';
	}
	
	function removeTodoFromStorage(todo) {
	    const todos = JSON.parse(localStorage.getItem('todos')) || [];
	    const newTodos = todos.filter(item => item !== todo);
	    localStorage.setItem('todos', JSON.stringify(newTodos));
	}

	
	/* todolist diary btn */
	function goToDiary() {
	   location.href = '/write';		// 다이어리 작성 페이지로 이동
	}
	
	/* todolist save btn */
	let selectedEmoji = null; // 전역 변수로 선택된 이모티콘을 저장합니다.
	let selectedDate = null;  // 전역 변수로 선택된 날짜를 저장합니다.

	document.addEventListener('DOMContentLoaded', function() {
	    const saveButton = document.getElementById('save');
    	
	    if (saveButton) {
	        saveButton.addEventListener('click', function(event) {
				console.log('Save button clicked');
	            const todoInputElement = document.getElementById('todo-input');
	            const todoListElement = document.getElementById('todo-list');
	
	            if (!todoInputElement) {
	                console.error('Todo input element not found');
	            } else {
	                console.log('Todo input element found');
	            }
	            
	            const todoInput = todoInputElement ? todoInputElement.value.trim() : '';
	            const todoListItems = todoListElement ? todoListElement.children.length : 0;
	
	            // Debugging logs
	            console.log('Todo Input:', todoInput);
	            console.log('Todo List Items:', todoListItems);
		    
			    if (todoInput === "" && todoListItems === 0) {
			        // 기본 동작을 막기 위해 event.preventDefault() 호출
			        event.preventDefault();
			        
			        Swal.fire({
			            title: '경고',
			            text: '할 일을 추가해 주세요.',
			            icon: 'warning',
			            confirmButtonText: '확인',
			            onClose: () => {
			                // 모달이 닫히지 않도록 설정
			                $('#modalWrap-2').show();
			                
			                const imgBox = document.querySelector('#modalWrap-2 .img-box');
					        const modalDate = document.querySelector('#modalWrap-2 .modal-date');
					
					        if (imgBox && modalDate) {
					            imgBox.style.display = 'block'; // 또는 다른 필요한 스타일 설정
					            modalDate.style.display = 'block'; // 또는 다른 필요한 스타일 설정
							}
							if (selectedEmoji) {
	                            $('#img-box').html(`<img class="in-modal-imoticon" src="${selectedEmoji}" />`);
	                        }
	                        if (selectedDate) {
	                            $('#modal-date').html(`<div class="select-dt">${selectedDate}</div>`);
	                        }
			            }
			        });
			    } else {
					saveTodo();
					modal.style.display = 'none';
				}
			});
		} else {
			// 할 일 저장 로직을 여기에 추가합니다.
			saveTodo(); // 예시로 기존 saveTodo 함수를 호출합니다.
		}
	});
	
	function saveTodo() {
	    const todoInput = document.getElementById('todo-input').value;
	    const todoList = document.getElementById('todo-list');
	    
	    if (todoInput) {
	        const listItem = document.createElement('li');
	        listItem.textContent = todoInput;
	        todoList.appendChild(listItem);
	        
	        document.getElementById('todo-input').value = ''; // 입력 필드 초기화
	        
	        if (!diaryEntries[textDt]) {
	            diaryEntries[textDt] = 0;
	        }
	        diaryEntries[textDt]++;
	    }
	}
	
	/* todoAdd button */
	function todoAdd() {
	    const todoInput = document.getElementById('todo-add');
	    const todoList = document.getElementById('newtodo-list');
	
	    if (todoInput.value.trim() === '') {
			Swal.fire({
				icon: "error",
				html: "할 일을 입력하세요!"
			});
	        return;
	    }
	    
	    // 로컬 스토리지에 저장
	    /*
	    localStorage.setItem('todo', todoInput.value);
		todoInput.value = '';
		*/
		
	    const li = document.createElement('li');
	    li.textContent = todoInput.value; // 최근에 입력한 todo-list 데이터
	
	    const editButton = document.createElement('button');
	    const deleteButton = document.createElement('button');
	
	    editButton.textContent = '수정';
	    editButton.className = 'edit-btn';
	    editButton.onclick = function() {
	        editTodoItem(li);
	    };
	
	    deleteButton.textContent = '삭제';
	    deleteButton.className = 'delete-btn';
	    deleteButton.onclick = function() {
	        li.remove();
	    };
	
	    li.appendChild(editButton);
	    li.appendChild(deleteButton);
	    todoList.appendChild(li);
	
	    todoInput.value = '';
	}
	
	/* li 수정 */
	function editTodoItem(li) {
	    const currentText = li.firstChild.textContent;
	    const editInput = document.createElement('input');
	    editInput.type = 'text';
	    editInput.maxLength = 10;
	    editInput.className = 'edit-input';
	    editInput.value = currentText;
	
	    const saveEditButton = document.createElement('button');
	    saveEditButton.textContent = '저장';
	    saveEditButton.className = 'save-edit'; // 필요한 스타일을 위해 클래스 추가
	    saveEditButton.onclick = function() {
	        li.innerHTML = ''; // li의 내용을 모두 지우기
	        li.textContent = editInput.value;
	        li.appendChild(editButton);
	        li.appendChild(deleteButton);
	    };
	
	    const editButton = li.querySelector('.edit-btn');
	    const deleteButton = li.querySelector('.delete-btn');
	
	    li.insertBefore(editInput, editButton);
	    li.insertBefore(saveEditButton, editButton);
	
	    li.removeChild(editButton);
	    li.removeChild(deleteButton);
	}
	
	// 모달 닫기
	const closeModal = document.getElementById('modalWrap-2');
	
	save.onclick = function() {
	    closeModal.style.display = 'none';
	    
		let imgBox = document.getElementById('img-box');
		let inImg = document.querySelector('.in-modal-imoticon');
		let modalDt = document.getElementById('modal-date');
		let selDt = document.querySelector('.select-dt');
	
		if (selDt && modalDt.contains(selDt)) {
        	modalDt.removeChild(selDt);
	    }
	    if (inImg && imgBox.contains(inImg)) {
	        imgBox.removeChild(inImg);
	    }
	    
		$(".input-title").val("");
		$(".diary-box").val("");
	}
	
	/* list page script */
	/*
	document.addEventListener('DOMContentLoaded', function() {
	    const todoList = document.getElementById('todo-list');
	    const todo = localStorage.getItem('todo');
	
	    if (todo) {
	        const li = document.createElement('li');
	        li.textContent = todo;
	
	        li.addEventListener('click', function() {
	            li.classList.toggle('completed');
	        });
	
	        todoList.appendChild(li);
	    }
	});
	*/