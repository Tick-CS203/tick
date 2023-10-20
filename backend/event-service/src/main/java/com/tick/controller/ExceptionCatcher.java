package com.tick.controller;

import com.tick.exception.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.bind.MethodArgumentNotValidException;

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
        return ResponseEntity.status(400).body(new ErrorMessage("Formatting exception", 400));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> not_valid() {
        return ResponseEntity.status(400).body(new ErrorMessage("Invalid object received", 400));
    }

    @ExceptionHandler(VenueNotFoundException.class)
    public ResponseEntity<?> generic_exception(VenueNotFoundException e) {
        return ResponseEntity.status(404)
            .body(new ErrorMessage(e.getMessage(), 404));
    }
}
