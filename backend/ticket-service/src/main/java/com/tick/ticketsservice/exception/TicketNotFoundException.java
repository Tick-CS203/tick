package com.tick.ticketsservice.exception;

public class TicketNotFoundException extends WebException {
    public TicketNotFoundException() {
        super("Ticket not found");
        status = 404;
    }
}
