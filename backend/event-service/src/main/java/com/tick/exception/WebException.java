package com.tick.exception;

public abstract class WebException extends RuntimeException {
    protected int status;

    public WebException(String message) {
        super(message);
    }

    public int getStatus() {
        return status;
    }
}
