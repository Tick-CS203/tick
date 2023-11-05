package com.tick.ticketsservice.exception;

public class EventUpdateException extends WebException {
    public EventUpdateException() {
        super("Availability update failed");
        status = 500;
    }
}
