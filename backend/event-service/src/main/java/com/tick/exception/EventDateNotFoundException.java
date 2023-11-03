package com.tick.exception;

public class EventDateNotFoundException extends WebException {
    public EventDateNotFoundException() {
        super("Event date not found");
        status = 404;
    }

    public EventDateNotFoundException(String message) {
        super("Event date not found" + message);
        status = 404;
    }
}
