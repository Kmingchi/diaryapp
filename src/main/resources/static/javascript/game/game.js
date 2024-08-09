/* 사다리타기 js */
let gamePlayed = false;

    function selectLadder(choice) {
        if (gamePlayed) {
            Swal.fire({
                icon: "error",
                html: "게임 종료!<br>사다리 타기는 한 번만 할 수 있습니다."
            });
            return;
        }

        const results = ['당첨!', '꽝', '꽝', '꽝'];
        const shuffledResults = results.sort(() => Math.random() - 0.5);

        for (let i = 1; i <= 4; i++) {
            document.getElementById(`result${i}`).textContent = `${shuffledResults[i - 1]}`;
        }

        document.getElementById(`choice${choice}`).classList.add('selected');
        gamePlayed = true;

        // 선택한 사다리 경로 따라가기
        drawLadderPath(choice);
    }

    function drawLadderPath(choice) {
        const dot = document.getElementById('ladderDot');
        dot.style.display = 'block'; // 점을 표시
        
        const startX = (choice - 1) * 32.66;
        dot.style.left = startX + '%'; // 초기 위치 설정
        dot.style.top = '0%'; // 초기 위치 설정
        
        const paths = {
            1: [{ x: 0, y: 0 }, { x: 0, y: 8 }, { x: 33, y: 8 }, { x: 33, y: 18 }, { x: 65.66, y: 18 }, { x: 65.66, y: 28 }, { x: 98, y: 28 }, { x: 98, y: 58 }, { x: 65.66, y: 58 }, { x: 65.66, y: 68 }, { x: 33, y: 68 }, { x: 33, y: 87 }],
            2: [{ x: 33, y: 0 }, { x: 33, y: 8 }, { x: 0, y: 8 }, { x: 0, y: 38 }, { x: 33, y: 38 }, { x: 33, y: 48 }, { x: 65.66, y: 48 }, { x: 65.66, y: 58 }, { x: 98, y: 58 }, { x: 98, y: 78 }, { x: 65.66, y: 78 }, { x: 65.66, y: 87 }],
            3: [{ x: 65.66, y: 0 }, { x: 65.66, y: 18 }, { x: 33, y: 18 }, { x: 33, y: 38 }, { x: 0, y: 38 }, { x: 0, y: 61 }, { x: 33, y: 76 }, { x: 33, y: 87 }],
            4: [{ x: 98, y: 0 }, { x: 98, y: 28 }, { x: 65.66, y: 28 }, { x: 65.66, y: 48 }, { x: 33, y: 48 }, { x: 33, y: 68 }, { x: 65.66, y: 68 }, { x: 65.66, y: 78 }, { x: 98, y: 78 }, { x: 98, y: 87 }]
        };

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep >= paths[choice].length) {
                clearInterval(interval);
                return;
            }
            const pos = paths[choice][currentStep];
            dot.style.left = pos.x + '%';
            dot.style.top = pos.y + '%';
            currentStep++;
        }, 300); // 경로 이동 속도 조정
    }


/* 주사위 던지기 js */
let point = 0;
let rolls = 0;
const maxRolls = 3;

function rollDice() {
    if (rolls >= maxRolls) {
		Swal.fire({
			icon: "error",
			html: "게임 종료!<br>주사위는 최대 세 번까지 던질 수 있습니다."
		});
		return;
    }

    const diceResult = Math.floor(Math.random() * 6) + 1;
    point += diceResult;
    rolls++;
    
    document.getElementById('diceresult').textContent = `주사위 결과: ${diceResult}`;
    document.getElementById('point').textContent = `총 점수: ${point}`;
    
    // 주사위 결과 이미지
    const diceResultImage = document.getElementById('diceResult');
    let diceImage = '';
    
    if (diceResult === 1) {
		diceImage = 'image/game/dice1.png';
    } else if (diceResult === 2) {
		diceImage = 'image/game/dice2.png';
    } else if (diceResult === 3) {
		diceImage = 'image/game/dice3.png';
    } else if (diceResult === 4) {
		diceImage = 'image/game/dice4.png';
    } else if (diceResult === 5) {
		diceImage = 'image/game/dice5.png';
    } else if (diceResult === 6) {
		diceImage = 'image/game/dice6.png';
    }
    diceResultImage.innerHTML = `<img src="/${diceImage}" alt="${diceResult} 이미지">`;
}

/* 두더지 잡기 js */
let molescore = 0;
let timeLeft = 60;
const cells = document.querySelectorAll('.cell');

let activeCell;
const maxScore = 50;

function randomMole() {
    if (activeCell) {
		activeCell.classList.remove('mole');
    }
    const randomIndex = Math.floor(Math.random() * cells.length);
    activeCell = cells[randomIndex];
    activeCell.classList.add('mole');
}

function startGame() {
    randomMole();
    const gameInterval = setInterval(() => {
		if (timeLeft > 0 && molescore < maxScore) {
		    timeLeft--;
		    document.getElementById('timer').textContent = `시간: ${timeLeft}`;
		} else {
		    clearInterval(gameInterval);
		    Swal.fire({
				icon: "success",
				html: `게임 종료!<br>최종 점수: ${molescore}`
			});
		}
    }, 1000);
    setInterval(randomMole, 700);  // 두더지가 나오는 시간 0.7초로 설정 난이도 올리고싶으면 시간 내리고 난이도 내리고싶으면 시간 올리면 됨
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
		if (cell.classList.contains('mole')) {
		    molescore++;
		    document.getElementById('molescore').textContent = `점수: ${molescore}`;
		    cell.classList.remove('mole');
		    randomMole();
		    
		    if (molescore >= maxScore) {
				Swal.fire({
					icon: "success",
					html: `축하힙니다!<br>최대 점수 ${maxScore}점을 달성했습니다!`
				});
				window.location.reload();
			}
		}
    });
});
startGame();