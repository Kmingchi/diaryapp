/**
 *  tags.js
 * 그냥 태그들 모아놓은 자바스크립트임 
 */

/*
	tags : JSON형식으로 저장되어있음
	tag_keys() : key값
	tag_values() : value값
	tag_size : key값의 개수
*/

var tags={
  "감정": [
	"행복",
    "슬픔",
    "화남",
    "신남",
    "불안",
    "편안",
    "지루함",
    "놀람",
    "감사",
    "동기부여"
  ],
  "활동": [
    "일",
    "운동",
    "독서",
    "요리",
    "여행",
    "공부",
    "쇼핑",
    "친구 만나기",
    "영화 감상",
    "게임 하기"
  ],
  "날씨": [
    "맑음",
    "흐림",
    "비",
    "폭풍",
    "눈",
    "바람",
    "안개",
    "습함",
    "건조",
    "추움"
  ],
  "장소": [
    "집",
    "사무실",
    "헬스장",
    "공원",
    "카페",
    "식당",
    "도서관",
    "해변",
    "산",
    "쇼핑몰"
  ],
  "건강": [
    "건강함",
    "아픔",
    "피곤",
    "활기참",
    "부상",
    "휴식",
    "스트레스",
    "편안함",
    "배고픔",
    "배부름"
  ],
  "사회적 관계": [
    "가족",
    "친구",
    "동료",
    "낯선 사람",
    "파트너",
    "반려동물",
    "혼자",
    "그룹",
    "네트워킹",
    "온라인"
  ],
  "업무": [
    "할 일",
    "완료",
    "진행 중",
    "보류 중",
    "연체",
    "취소됨",
    "위임됨",
    "우선순위",
    "일상",
    "선택 사항"
  ]
}

const tag_keys = Object.keys(tags);
const tag_values= Object.values(tags);
const tag_size=tag_keys.length;

//temp sticker
var tempSticker=[];
for(let i=0;i<3;i++){
	tempSticker[i]=new Array();
	for(let j=0;j<4;j++){
		tempSticker[i].push('image/sticker/tempGroup'+(i+1)+'/&(sticker)@'+(j+1)+'.png');
	}
}