package com.tick.bookmarks.controller;

import com.tick.bookmarks.exceptions.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class ExceptionCatcher {
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<?> no_event(Exception e) {
        return ResponseEntity.status(400).body(new ErrorMessage(e.getMessage(), 400));
    }

    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseEntity<?> no_body() {
        return ResponseEntity.status(400).body(new ErrorMessage("Missing or malformed request body", 400));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> wrong_type() {
        return ResponseEntity.status(404).body(new ErrorMessage("Formatting exception", 404));
    }

    @ExceptionHandler(EventNotFoundException.class)
    public ResponseEntity<?> no_such_event() {
        return ResponseEntity.status(404).body(new ErrorMessage("Event not found", 404));
    }
}
