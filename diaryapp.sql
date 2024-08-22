CREATE SCHEMA IF NOT EXISTS diaryapp;

USE diaryapp;

-- 1. User_DB 테이블 생성
CREATE TABLE User_DB (
    user_id VARCHAR(50) PRIMARY KEY,
    password VARCHAR(70),
    nickname VARCHAR(20),
    email VARCHAR(55),
    profile_image VARCHAR(200)
);

-- 2. ChatRoom_DB 테이블 생성
CREATE TABLE ChatRoom_DB (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(50),
    updated_at DATETIME
);

-- 3. Diary_DB 테이블 생성
CREATE TABLE Diary_DB (
    diary_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50),
    title VARCHAR(50),
    content TEXT,
    date DATE,
    photo VARCHAR(200),
    sticker VARCHAR(200),
    is_public BOOLEAN,
    emotion_id INT,
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 4. Emotion_DB 테이블 생성
CREATE TABLE Emotion_DB (
    emotion_id INT PRIMARY KEY AUTO_INCREMENT,
    diary_id INT,
    user_id VARCHAR(50),
    positive_score INT,
    negative_score INT,
    neutral_score INT,
    dominant_emotion VARCHAR(20),
    FOREIGN KEY (diary_id) REFERENCES Diary_DB(diary_id),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 5. Messages_DB 테이블 생성
CREATE TABLE Messages_DB (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    user_id VARCHAR(50),
    message TEXT,
    created_at DATETIME,
    FOREIGN KEY (room_id) REFERENCES ChatRoom_DB(room_id),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 6. UserChatRoom_DB 테이블 생성
CREATE TABLE UserChatRoom_DB (
    userchatroom_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50),
    chatroom_id INT,
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id),
    FOREIGN KEY (chatroom_id) REFERENCES ChatRoom_DB(room_id)
);

-- 7. Friend_DB 테이블 생성
CREATE TABLE Friend_DB (
    friend_id VARCHAR(50),
    user_id VARCHAR(50),
    FOREIGN KEY (friend_id) REFERENCES User_DB(user_id),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 8. Comment_DB 테이블 생성
CREATE TABLE Comment_DB (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_parent_id INT,
    comment_layer INT,
    diary_id INT,
    user_id VARCHAR(50),
    text TEXT,
    FOREIGN KEY (diary_id) REFERENCES Diary_DB(diary_id),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 9. Tag_DB 테이블 생성
CREATE TABLE Tag_DB (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(10),
    diary_id INT,
    FOREIGN KEY (diary_id) REFERENCES Diary_DB(diary_id)
);

-- 10. Like_DB 테이블 생성 (좋아요 기능 추가)
CREATE TABLE Like_DB (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    diary_id INT,
    user_id VARCHAR(50),
    FOREIGN KEY (diary_id) REFERENCES Diary_DB(diary_id),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 11. TodoList_DB 테이블 생성 (투두리스트 기능 추가)
CREATE TABLE TodoList_DB (
    todo_id INT PRIMARY KEY AUTO_INCREMENT,
    diary_id INT,
    user_id VARCHAR(50),
    todo_item VARCHAR(100),
    is_completed BOOLEAN,
    FOREIGN KEY (diary_id) REFERENCES Diary_DB(diary_id),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 12. Share_Diary_DB 테이블 생성
CREATE TABLE Share_Diary_DB (
    shared_diary_id INT PRIMARY KEY AUTO_INCREMENT,
    diary_id INT,
    user_id VARCHAR(50),
    shared_title VARCHAR(50),
    shared_content TEXT,
    memo TEXT,
    FOREIGN KEY (diary_id) REFERENCES Diary_DB(diary_id),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 13. Storage_DB 테이블 생성
CREATE TABLE Storage_DB (
    storage_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50),
    title VARCHAR(50),
    content TEXT,
    date DATE,
    photo VARCHAR(200),
    sticker VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id)
);

-- 14. Shop_DB 테이블 생성
CREATE TABLE Shop_DB (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(20),
    item_type VARCHAR(20),
    price INT,
    image_uri VARCHAR(200)
);

-- 15. My_Item_DB 테이블 생성
CREATE TABLE My_Item_DB (
    myitem_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50),
    item_id INT,
    quantity INT,
    total_price INT,
    current_price INT,
    FOREIGN KEY (user_id) REFERENCES User_DB(user_id),
    FOREIGN KEY (item_id) REFERENCES Shop_DB(item_id)
);
