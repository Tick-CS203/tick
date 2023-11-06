package com.tick.ticketsservice.exception;

public class EventNotFoundException extends WebException {
    public EventNotFoundException() {
        super("Event not found");
        status = 404;
    }
}
