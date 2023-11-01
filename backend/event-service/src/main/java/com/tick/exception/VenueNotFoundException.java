package com.tick.exception;

public class VenueNotFoundException extends WebException {
    public VenueNotFoundException() {
        super("Venue not found");
        status = 404;
    }

    public VenueNotFoundException(String message) {
        super("Venue not found: " + message);
        status = 404;
    }
}
