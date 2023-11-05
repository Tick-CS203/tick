package com.tick.exception;

public class EventDateExistsException extends WebException {
    public EventDateExistsException() {
        super("EventDate already exists, delete before adding again");
        status = 409;
    }

    public EventDateExistsException(String message) {
        super("EventDate already exists, delete before adding again: " + message);
        status = 409;
    }
}
