package com.tick.ticketsservice.controller;

import java.time.LocalDateTime;

import com.tick.ticketsservice.exception.WebException;

public class ErrorMessage {
    private String timestamp;
    private String error;
    private int status;

    public ErrorMessage(String error, int status) {
        this.error = error;
        timestamp = LocalDateTime.now().toString();
        this.status = status;
    }

    public ErrorMessage(WebException e) {
        this(e.getMessage(), e.getStatus());
    }

    public String getError() {
        return error;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }
};
