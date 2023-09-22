package com.tick.ticketsservice.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
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
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.addTicket(ticket);
    }

    @PutMapping
    public Ticket modifyTicket(@RequestBody Ticket ticket) {
        return ticketService.updateTicket(ticket);
    }

    //delete after ticket object belonging to prev user after it has been transferred
    @DeleteMapping
    public String deleteByTicketId(
            @RequestParam(name="eventDate") String eventDate,
            @RequestParam(name="section") String section,
            @RequestParam(name="row") String row,
            @RequestParam(name="seatNumber") String seatNumber
            ) {
        try {
            return ticketService.deleteTicketByTicketId(new CompositeKey(eventDate, section, row, Integer.parseInt(seatNumber)));
        } catch (NumberFormatException e) {
            return "seatNumber is invalid";
        }
            }

    @GetMapping("/user/{userId}")
    public List<Ticket> getTicketByUserId(@PathVariable String userId) {
        return ticketService.getTicketByUserId(userId);
    }

    //if user asks for a refund
    @DeleteMapping("/user/{userId}")
    public List<Ticket> ticketsMadeAvailable(@PathVariable String userId) {
        return ticketService.releaseTicket(userId);
    }

    @GetMapping("/ticket")
    public Ticket tickeyByKey(
            @RequestParam(name="eventDate") String eventDate,
            @RequestParam(name="section") String section,
            @RequestParam(name="row") String row,
            @RequestParam(name="seatNumber") String seatNumber
            ) {
        try {
            return ticketService.getTicketByKey(new CompositeKey(eventDate, section, row, Integer.parseInt(seatNumber)));
        } catch (NumberFormatException e) {
            return new Ticket();
        }
            }
    //if event is cancelled
    @DeleteMapping("/event/{eventId}")
    public String deleteByEventId(@PathVariable String eventId) {
        return ticketService.deleteTicketByEvent(eventId);
    }

    @PostMapping("/{recaptchaToken}")
    public Object verifyRecaptcha(@PathVariable String recaptchaToken) {
        return ticketService.verifyRecaptcha(recaptchaToken);
    }
}
