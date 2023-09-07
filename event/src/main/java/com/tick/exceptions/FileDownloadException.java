package com.tick.exceptions;

public class FileDownloadException extends SpringBootFileUploadException {
   public FileDownloadException(String message) {
       super(message);
   }
}