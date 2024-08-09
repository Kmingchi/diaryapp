package com.main.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FileUploadUtil {
	public static List<String> fileUpload(List<MultipartFile> files,String path) {
		List<String> pathList=new ArrayList<String>();
		//폴더가 없으면 폴더 생성을 위한
		File folder=new File(path);
		if(!folder.exists()) {
			try {
				folder.mkdir();
				log.info("새로운 유저라 폴더를 생성합니다.");
				log.info("경로 : "+path);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		for(MultipartFile file : files){
			String filePath=path+"\\";
			String fileRename=UUID.randomUUID()+file.getOriginalFilename();

			log.info("fileFolder : "+filePath);
			log.info("file rename : "+fileRename);
			log.info("file real path : "+filePath+fileRename);
			
			try {
				File saveFile=new File(filePath,fileRename);
				file.transferTo(saveFile);
				
				pathList.add(filePath+fileRename);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return pathList;
	}
}
