function logout() {
	alert('로그아웃 되었습니다.');
	$.ajax({
		url: serverURL + "/logout",
		method: "POST",
		success: function(response) {
			// 로컬 스토리지에서 토큰 제거
			localStorage.removeItem('token');
			// 페이지 새로고침
			location.reload();
		},
		error: function(error) {
			console.error("로그아웃 실패:", error);
		}
	});
}

function showContent(type) {
	const contentArea = document.getElementById('content-area');
	let content = '';

	switch (type) {
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
			<div class="board-body-alert">
			<style>
			        .settings-container {
			            font-family: Arial, sans-serif;
			            max-width: 300px;
			            margin: 20px auto;
			        }
			        .theme-options, .language-options {
			            border: 1px solid #ccc;
			            padding: 10px;
			            margin-bottom: 10px;
			        }
			        .theme-options h3, .language-options h3 {
			            margin-top: 0;
			        }
			        .theme-boxes {
			            display: flex;
			            justify-content: space-around;
			            margin-bottom: 10px;
			        }
			        .theme-box {
			            width: 100px;
			            height: 100px;
			            border: 1px solid #000;
			        }
			        .theme-box.dark {
			            background-color: #000;
			        }
			        .checkbox-option {
			            margin-right: 20px;
			        }
			    </style>
			    <div class="settings-container">
			        <div class="theme-options">
			            <h3>theme</h3>
			            <div class="theme-boxes">
			                <div class="theme-box"></div>
			                <div class="theme-box dark"></div>
			            </div>
			            <div>
			                <label class="checkbox-option">
			                    <input type="checkbox" name="theme" value="light"> Light
			                </label>
			                <label class="checkbox-option">
			                    <input type="checkbox" name="theme" value="dark"> Dark
			                </label>
			            </div>
			        </div>
			        <div class="language-options">
			            <h3>language</h3>
			            <div>
			                <label class="checkbox-option">
			                    <input type="checkbox" name="language" value="korean"> 한국어
			                </label>
			                <label class="checkbox-option">
			                    <input type="checkbox" name="language" value="english"> English
			                </label>
			            </div>
			        </div>
			    </div>
			</div>
			`;
			break;

		case 'personal':
			content = `
					<div class="board-body-alert type1">
						<div class="container">
						       <div class="profile-icon">👤</div>
							   <br>
							   <div class="board-body-alert type1">
							   <h3>setting</h3>
						       <div class="setting-row">
						           <span>계정</span>
						           <input type="text" value="id@example.com" placeholder="계정 변경" readonly>
						       </div>
						       <div class="setting-row">
						           <span>닉네임</span>
						           <input type="text" value="닉네임">
						           <button id="nameChange">변경</button>
						       </div>
						       <div class="setting-row">
						           <span>비밀번호 변경</span>
						           <input type="password" value="" placeholder="비밀번호 변경">
						           <button id="passwordChange">변경</button>
								   </div>
						       </div>
						   </div>
					   </div>`;
			break;

		case 'friend':
			content = `
			<div class="board-body-alert type1">
			    <div class="friend-management-container">
			        <h2>Friend</h2>
			        <div class="friend-option">
			            <button>친구 목록</button>
			        </div>
			        <div class="friend-option">
			            <button>친구 요청 관리</button>
			        </div>
			        <div class="friend-option">
			            <button>차단 친구 관리</button>
			        </div>
			        <div class="friend-option">
			            <span>자동 친구 추가</span>
			            <label class="toggle-switch">
			                <input type="checkbox" id="addFriend">
			                <span class="slider"></span>
			            </label>
			        </div>
			        <div class="friend-option">
			            <span>이메일로 친구 추가 허용</span>
			            <label class="toggle-switch">
			                <input type="checkbox" id="allowFriend">
			                <span class="slider"></span>
			            </label>
			        </div>
			    </div>
			</div>
			`;
			break;

		case 'item':
			content = `
			<div class="board-body-alert type1">
			    <h4>아이템 관리</h4>
			    <p>여기에서 아이템을 관리할 수 있습니다.</p>
			</div>`;
			break;

		case 'logout':
			content = `
			<div class="board-body-alert type1">
				<h4>로그아웃</h4>
				<p>여기에서 로그아웃 할 수 있습니다.</p>
				<button id="logoutButton">로그아웃</button>
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

	document.getElementById('logoutButton').addEventListener('click', function() {
        logout();
    });
	

	//개인설정 > 닉네임변경.
	let nameChange = document.getElementById("nameChange");
	if (nameChange) {
		nameChange.addEventListener("click", () => {
			alert("닉네임이 변경되었습니다")
		});
	}
	//개인설정 > 비밀번호 변경.
	let passwordChange = document.getElementById("passwordChange");
	if (passwordChange) {
		passwordChange.addEventListener("click", () => {
			alert("비밀번호가 변경되었습니다")
		});
	}
	//친구관리 > 친구추가.
	let addFriend = document.getElementById("addFriend");
	if (addFriend) {
		addFriend.addEventListener("click", (e) => {
			if (e.target.checked) {
				console.log("이메일로 친구 추가가 허용되었습니다.");
				// 여기에 친구 추가 허용 시 수행할 추가 로직을 넣으세요
				// 예: 서버에 상태 업데이트 요청 보내기
				// updateFriendAdditionStatus(true);
			} else {
				console.log("이메일로 친구 추가가 비활성화되었습니다.");
				// 여기에 친구 추가 비활성화 시 수행할 추가 로직을 넣으세요
				// 예: 서버에 상태 업데이트 요청 보내기
				// updateFriendAdditionStatus(false);
			}
		});
	}


	//친구관리 > 친구허용.
	let allowFriend = document.getElementById("allowFriend");
	if (allowFriend) {
		allowFriend.addEventListener("click", (e) => {
			if (e.target.checked) {
				console.log("이메일로 친구 추가가 허용되었습니다.");
				// 여기에 친구 추가 허용 시 수행할 추가 로직을 넣으세요
				// 예: 서버에 상태 업데이트 요청 보내기
				// updateFriendAdditionStatus(true);
			} else {
				console.log("이메일로 친구 추가가 비활성화되었습니다.");
				// 여기에 친구 추가 비활성화 시 수행할 추가 로직을 넣으세요
				// 예: 서버에 상태 업데이트 요청 보내기
				// updateFriendAdditionStatus(false);
			}
		});
	}

	// 로그아웃 버튼에 클릭 이벤트 추가
	/*let logoutButton = document.addEventListener('DOMContentLoaded', function() {
		const logoutButton = document.getElementById('logoutButton');
	    
		logoutButton.addEventListener('click', function() {
			fetch('/logout', { // 로그아웃 엔드포인트로 요청 전송
				method: 'POST',
				credentials: 'include' // 쿠키를 포함하여 요청
			})
			.then(response => {
				if (response.ok) {
					alert('로그아웃되었습니다.');
					window.location.href = '/'; // 로그아웃 후 메인 페이지로 리디렉션
				} else {
					alert('로그아웃에 실패했습니다.');
				}
			})
			.catch(error => {
				console.error('로그아웃 중 오류가 발생했습니다:', error);
			});
		});
	});*/


	// 드롭다운 버튼 및 메뉴 초기화
	const dropdownButton = document.getElementById('dropdown');
	const dropdownMenu = document.getElementById('dropdown-menu');
	/*const firstItemText = dropdownMenu.querySelector('.dropdown-item').innerText;
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
	});*/
}