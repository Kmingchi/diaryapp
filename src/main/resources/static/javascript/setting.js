function showContent(contentId) {
    // board-body를 숨기고 alert와 type 보이기
    document.querySelector('.board-body').style.display = 'block';
    if (contentId === 'alert') {
        document.querySelector('.board-body-alert').style.display = 'block';
        document.querySelector('.board-body-type').style.display = 'block';
    }
}

// 페이지가 로드될 때 초기 설정
document.addEventListener('DOMContentLoaded', function() {
    // 초기 상태에서는 board-body만 보이도록 설정
    document.querySelector('.board-body').style.display = 'block';
    document.querySelector('.board-body-alert').style.display = 'none';
    document.querySelector('.board-body-type').style.display = 'none';
});
