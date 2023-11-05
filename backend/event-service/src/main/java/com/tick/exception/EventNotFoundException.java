package com.tick.exception;

import com.tick.model.Event;

public class EventNotFoundException extends WebException {
    public EventNotFoundException() {
        super("Event not found");
        status = 404;
    }

    public EventNotFoundException(String message) {
        super("Event not found" + message);
        status = 404;
    }

    public EventNotFoundException(Event event) {
        this(event.getEventID());
        status = 404;
    }
}
