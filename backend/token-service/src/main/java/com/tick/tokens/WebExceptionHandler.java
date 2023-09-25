package com.tick.tokens;

import com.tick.entity.ErrorMessage;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.ResponseEntity;

@ControllerAdvice
public class WebExceptionHandler {
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<?> no_token(Exception e) {
        return ResponseEntity.status(400).body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseEntity<?> no_body() {
        return ResponseEntity.status(400).body(new ErrorMessage("Missing or malformed request body"));
    }
}
