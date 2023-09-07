package com.tick.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

import com.tick.exceptions.FileDownloadException;
import com.tick.exceptions.FileUploadException;

public interface FileService {
   String uploadFile(MultipartFile multipartFile) throws FileUploadException, IOException;

   Object downloadFile(String fileName) throws FileDownloadException, IOException;

   boolean delete(String fileName);
}