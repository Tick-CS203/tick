package com.tick.ticketsservice.exception;

public class UnauthorisedException extends WebException {
    public UnauthorisedException() {
        super("Unauthorised request");
        this.status = 401;
    }
}
