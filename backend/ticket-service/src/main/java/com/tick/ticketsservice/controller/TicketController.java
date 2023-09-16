package com.tick.ticketsservice.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.service.TicketService;

@RestController
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public String health_check() {
        return "Service is running";
    }

    @GetMapping("/tickets")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PostMapping("/tickets")
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.addTicket(ticket);
    }

    @PutMapping("/tickets")
    public Ticket modifyTicket(@RequestBody Ticket ticket) {
        return ticketService.updateTicket(ticket);
    }

    @GetMapping("/tickets/{key}")
    public Ticket getTicket(@RequestBody CompositeKey key) {
        return ticketService.getTicketById(key);
    }

    @GetMapping("/tickets/userId/{userId}")
    public List<Ticket> getTicketByUserId(@PathVariable String userId) {
        return ticketService.getTicketByUserId(userId);
    }

    //if user asks for a refund
    @PutMapping("/tickets/{userId}")
    public List<Ticket> ticketsMadeAvailable(@PathVariable String userId) {
        return ticketService.releaseTicket(userId);
    }

    //if event is cancelled
    @DeleteMapping("/tickets/eventId/{eventId}")
    public String deleteByEventId(@PathVariable String eventId) {
        return ticketService.deleteTicketByEvent(eventId);
    }

    //delete after ticket object belonging to prev user after it has been transferred
    @DeleteMapping("/tickets")
    public String deleteByTicketId(@RequestBody CompositeKey key) {
        return ticketService.deleteTicketByTicketId(key);
    }
}
