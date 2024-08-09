/* 가위바위보 js */
let rspscore = 0;
let rounds = 0;
const maxRounds = 3;

function selectChoice(userChoice) {
    if (rounds >= maxRounds) {
		Swal.fire({
			icon: "error",
			html: "게임 종료!<br>최대 3판까지 할 수 있습니다."
		});
		return;
    }

    const choices = ['바위', '가위', '보'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let resultText = '';

    if (userChoice === computerChoice) {
		resultText = `무승부! 😐`;
		rspscore += 2;
    } else if (
		(userChoice === '가위' && computerChoice === '보') ||
		(userChoice === '바위' && computerChoice === '가위') ||
		(userChoice === '보' && computerChoice === '바위')
    ) {
		resultText = "승리! 😆";
		rspscore += 3;
    } else {
		resultText = `패배! 😓`;
		rspscore += 1;
    }
    rounds++;
    
    document.getElementById('rspresult').textContent = resultText;
    document.getElementById('rspscore').textContent = `총 점수: ${rspscore}`;

    // 컴퓨터의 선택을 이미지로 표시
    const computerChoiceDiv = document.getElementById('computerChoice');
    let computerImage = '';
    
    if (computerChoice === '바위') {
		computerImage = 'image/game/rock.png';
    } else if (computerChoice === '가위') {
		computerImage = 'image/game/scissors.png';
    } else if (computerChoice === '보') {
		computerImage = 'image/game/paper.png';
    }
    computerChoiceDiv.innerHTML = `<img src="/${computerImage}" alt="${computerChoice} 이미지">`;
}