package com.venue.exception;

public class WebException extends RuntimeException {
    protected int status;

    public WebException(String message) {
        super(message);
    }

    public int getStatus() {
        return status;
    }
}
