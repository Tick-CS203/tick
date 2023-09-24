package com.tick.imageservice.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

import com.tick.imageservice.exceptions.FileDownloadException;
import com.tick.imageservice.exceptions.FileUploadException;

public interface FileService {
   String uploadFile(MultipartFile multipartFile) throws FileUploadException, IOException;

   Object downloadFile(String fileName) throws FileDownloadException, IOException;

   boolean delete(String fileName);
}