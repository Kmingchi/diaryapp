function showContent(type) {
	const contentArea = document.getElementById('content-area');
	let content = '';

	switch(type) {
	    case 'alert':
	        content = `
			<div class="board-body-alert">
			    <h4>알림 설정</h4>
			    <div class="form-check">
			        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1">
			        <label class="form-check-label" for="flexCheckDefault1">
						소리 알림
			        </label>
			    </div>
			    <br>
			    <div class="form-check">
			        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2">
			        <label class="form-check-label" for="flexCheckDefault2">
						알림 일시 중지
			        </label>
			    </div>
			    <br>
			    <div class="form-check">
			        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3">
			        <label class="form-check-label" for="flexCheckDefault3">
						알림 해제
			        </label>
			    </div>
			    <div class="dropdown">
			        <button class="btn dropdown-toggle" id="dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						시간
			        </button>
			        <ul class="dropdown-menu" id="dropdown-menu">
						<li><a class="dropdown-item" href="#" active> 3시간 </a></li>
						<li><a class="dropdown-item" href="#"> 6시간 </a></li>
						<li><a class="dropdown-item" href="#"> 9시간 </a></li>
						<li><a class="dropdown-item" href="#"> 12시간 </a></li>
			        </ul>
			    </div>
			</div>
			<div class="board-body-type">
				<h4> 알림 설정 </h4>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
					<label class="form-check-label" for="flexCheckDefault">
						표시 시간
					</label>
				</div>
				<div class="dropdown-time">
					<button class="btn dropdown-toggle" id="dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						시간
					</button>
					<ul class="dropdown-menu" id="dropdown-menu">
						<li><a class="dropdown-item" href="#"> 3초 </a></li>
						<li><a class="dropdown-item" href="#"> 5초 </a></li>
						<li><a class="dropdown-item" href="#"> 7초 </a></li>
					</ul>
				</div>
				<br>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
					<label class="form-check-label" for="flexCheckDefault">
						표시 방법
					</label>
				</div>
				<div class="dropdown-type">
					<button class="btn dropdown-toggle" id="dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						표시
					</button>
					<ul class="dropdown-menu" id="dropdown-menu">
						<li><a class="dropdown-item" href="#"> 보낸 사람 </a></li>
						<li><a class="dropdown-item" href="#"> 보낸 사람 + 메세지 </a></li>
						<li><a class="dropdown-item" href="#"> 비공개 </a></li>
					</ul>
				</div>
				<br>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
					<label class="form-check-label" for="flexCheckDefault">
						표시 위치
					</label>
				</div>
				<div class="dropdown-loca">
					<button class="btn dropdown-toggle" id="dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						위치
					</button>
					<ul class="dropdown-menu" id="dropdown-menu">
						<li><a class="dropdown-item" href="#"> 화면 우측 하단 </a></li>
						<li><a class="dropdown-item" href="#"> 화면 우측 상단 </a></li>
						<li><a class="dropdown-item" href="#"> 화면 좌측 하단 </a></li>
						<li><a class="dropdown-item" href="#"> 화면 좌측 하단 </a></li>
					</ul>
				</div>
			</div>`;
	        break;
	        
	    case 'theme':
	        content = `
			<div class="board-body-theme">
			    <h4>테마/언어</h4>
			    <p>여기에서 테마와 언어를 변경할 수 있습니다.</p>
			</div>`;
	        break;
	        
	    case 'personal':
	        content = `
			<div class="board-body-personal">
			    <h4>개인 설정</h4>
			    <p>여기에서 개인 설정을 관리할 수 있습니다.</p>
			</div>`;
	        break;
	        
	    case 'friend':
	        content = `
			<div class="board-body-friend">
			    <h4>친구 관리</h4>
			    <p>여기에서 친구를 관리할 수 있습니다.</p>
			</div>`;
	        break;
	        
	    case 'item':
	        content = `
			<div class="board-body-item">
			    <h4>아이템 관리</h4>
			    <p>여기에서 아이템을 관리할 수 있습니다.</p>
			</div>`;
	        break;
	        
	    default:
	        content = `
			<div class="board-body-default">
			    <h4>알 수 없는 항목</h4>
			    <p>잘못된 요청입니다.</p>
			</div>`;
	}
	contentArea.innerHTML = content;
	
	// 드롭다운 버튼 및 메뉴 초기화
	const dropdownButton = document.getElementById('dropdown');
	const dropdownMenu = document.getElementById('dropdown-menu');
	const firstItemText = dropdownMenu.querySelector('.dropdown-item').innerText;
	dropdownButton.innerText = firstItemText;

	dropdownButton.addEventListener('click', function() {
		dropdownMenu.classList.toggle('show');
		dropdownMenu.style.minWidth = "110px"; // 원하는 너비로 변경
	});

	// 드롭다운 외부 클릭 시 숨기기
	window.addEventListener('click', function(event) {
		if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
			dropdownMenu.classList.remove('show');
		}
	});
}