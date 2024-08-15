//로컬스토리지에 값을 저장하고 조회하는 메서드들을 모아둠

function setLocalData(key,value){
	window.localStorage.setItem(key,value);
}
function setLocalDataUsingJson(data){
	for(key in data){
		window.localStorage.setItem(key,data[key])
	}
}

function getLocalData(key){
	return window.localStorage.getItem(key);
}

function getAllLocalData(key){
	data={}
	for(let i=0;i<sizeOfLocalData();i++){
		const key=window.localStorage.key(i);
		const value=window.localStorage.getItem(key);
		
		data[key]=value;
	}
	return data;
}

function deleteLocalData(key){
	window.localStorage.removeItem(key);
}

function deleteAllLocalData(){
	window.localStorage.clear();
}

function sizeOfLocalData(){
	return window.localStorage.length;
}

function getLocalDataUsingIndex(index){
	return window.localStorage.key(index);
}