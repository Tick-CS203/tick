package com.tick.bookmarks.controller;

import com.tick.bookmarks.exceptions.*;
import com.tick.bookmarks.entity.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class ExceptionCatcher {
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<?> no_event(Exception e) {
        return ResponseEntity.status(400).body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseEntity<?> no_body() {
        return ResponseEntity.status(400).body(new ErrorMessage("Missing or malformed request body"));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> wrong_type() {
        return ResponseEntity.status(404).body(new ErrorMessage("Formatting exception"));
    }

    @ExceptionHandler(EventNotFoundException.class)
    public ResponseEntity<?> no_such_event() {
        return ResponseEntity.status(404).body(new ErrorMessage("Event not found"));
    }
}
