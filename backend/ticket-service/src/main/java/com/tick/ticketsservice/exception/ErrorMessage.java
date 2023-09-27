package com.tick.ticketsservice.exception;

import java.time.LocalDateTime;

public class ErrorMessage {
    private String timestamp;
    private String error;
    private int status;

    public ErrorMessage(String error, int status) {
        this.error = error;
        timestamp = LocalDateTime.now().toString();
        this.status = status;
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
