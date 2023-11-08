package com.venue.exception;

public class VenueNotFoundException extends WebException {
    public VenueNotFoundException() {
        super("Venue was not found");
        status = 404;
    }
}
