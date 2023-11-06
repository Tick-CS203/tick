package com.tick.ticketsservice.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

import com.tick.ticketsservice.model.*;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.security.TokenAuthentication;
import com.tick.ticketsservice.service.TicketService;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket createTicket(@RequestBody @Valid Ticket ticket) {
        return ticketService.addTicket(ticket);
    }

    @PutMapping
    public Ticket modifyTicket(@RequestBody @Valid Ticket ticket) {
        return ticketService.updateTicket(ticket);
    }

    // delete after ticket object belonging to prev user after it has been
    // transferred
    @DeleteMapping
    public String deleteByTicketId(
            @RequestParam(name = "event") String event,
            @RequestParam(name = "eventDate") String eventDate,
            @RequestParam(name = "section") String section,
            @RequestParam(name = "row") String row,
            @RequestParam(name = "seatNumber") String seatNumber) {
        try {
            return ticketService.deleteTicketByTicketId(
                    new CompositeKey(event, eventDate, section, row, Integer.parseInt(seatNumber)));
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "seatNumber must be a number");
        }
    }

    @GetMapping("/user")
    public List<Ticket> getTicketByUserId(TokenAuthentication token) {
        return ticketService.getTicketByUserId((String) token.getPrincipal());
    }

    // if user asks for a refund
    @DeleteMapping("/user")
    public List<Ticket> ticketsMadeAvailable(TokenAuthentication token) {
        return ticketService.releaseTicket((String) token.getPrincipal());
    }

    @GetMapping("/ticket")
    public Ticket ticketByKey(
            @RequestParam(name="event") String event,
            @RequestParam(name="eventDate") String eventDate,
            @RequestParam(name="section") String section,
            @RequestParam(name="row") String row,
            @RequestParam(name="seatNumber") String seatNumber
    ) {
        try {
            return ticketService
                    .getTicketByKey(new CompositeKey(event, eventDate, section, row, Integer.parseInt(seatNumber)));
        } catch (NumberFormatException e) {
            return new Ticket();
        }
    }
    
    //if event is cancelled
    @DeleteMapping("/event/{eventId}")
    public String deleteByEventId(@PathVariable String eventId) {
        return ticketService.deleteTicketByEvent(eventId);
    }

    @PostMapping("/recaptcha")
    public Object verifyRecaptcha(@Valid @RequestBody RecaptchaRequest recaptchaRequest) {
        return ticketService.verifyRecaptcha(recaptchaRequest);
    }

    @PostMapping("/allocate/{id}/{date}")
    public List<Ticket> allocateSeats(
            @PathVariable String id,
            @PathVariable String date,
            @RequestBody List<SelectedRow> selectedRows,
            TokenAuthentication auth) {

        return ticketService.allocateSeats(id, date, selectedRows, (String) auth.getPrincipal());
    }
}
