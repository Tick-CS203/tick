package com.tick.exception;

public class ArtistNotFoundException extends WebException {
    public ArtistNotFoundException(String message) {
        super("Artist not found: " + message);
        status = 404;
    }

    public ArtistNotFoundException() {
        super("Artist not found");
        status = 404;
    }
}
