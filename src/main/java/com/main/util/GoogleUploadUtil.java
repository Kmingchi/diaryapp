package com.main.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.client.util.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.main.properties.GoogleUploadProperties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class GoogleUploadUtil {
	
	private Storage storage;

	private final String bucket;
	
	public GoogleUploadUtil() throws IOException{
		InputStream keyFile=ResourceUtils.getURL("classpath:mycdnproject-430417-004c27ee2089.json").openStream();
		
		bucket="onejodiary202407";
		storage=StorageOptions.newBuilder()
				.setCredentials(GoogleCredentials.fromStream(keyFile))
				.build()
				.getService();
	}
	
	public List<String> googleUploadProcess(List<MultipartFile>files,String path){
		List<String> pathList=new ArrayList<>();
		for(MultipartFile file : files){
			String filePath=path+"/";
			String fileType=file.getContentType();
			String fileRename=UUID.randomUUID()+"."+fileType.substring(fileType.lastIndexOf("/")+1);
			
			String realFilePath=filePath+fileRename;
			
			log.info("file type : "+file.getContentType());
			log.info("bucketName : "+bucket);
			log.info("fileFolder : "+filePath);
			log.info("file rename : "+fileRename);
			log.info("file real path : "+filePath+fileRename);
			
			try {
				BlobInfo blobInfo = storage.create(
						BlobInfo.newBuilder(bucket,realFilePath)
									.setContentType(fileType)
									.build(),
						file.getInputStream()
						);
				pathList.add("https://storage.googleapis.com/"+bucket+"/"+realFilePath);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return pathList;
	}

	public boolean deleteImage(String url) {
		log.info("삭제 요청한 url : "+url);
		String fileName=url.replace("url=https://storage.googleapis.com/"+bucket+"/", "");
		log.info("file name : "+fileName);
		
		BlobId blobId=BlobId.of(bucket, fileName);
		
		return storage.delete(blobId);
	}
}
