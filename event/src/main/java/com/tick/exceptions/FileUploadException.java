package com.tick.exceptions;

public class FileUploadException extends SpringBootFileUploadException{
   public FileUploadException(String message) {
       super(message);
   }
}
