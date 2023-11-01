package com.tick.ticketsservice.exception;

public class EventDateNotFoundException extends WebException {
    public EventDateNotFoundException() {
        super("Event not found");
        status = 404;
    }
}
