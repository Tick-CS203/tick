package com.tick.imageservice.exceptions;

public class FileUploadException extends SpringBootFileUploadException{
   public FileUploadException(String message) {
       super(message);
   }
}
