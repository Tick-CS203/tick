package com.tick.ticketsservice.exception;

public class SeatSelectionException extends WebException {
    public SeatSelectionException(String message) {
        super(message);
        this.status = 400;
    }
}
