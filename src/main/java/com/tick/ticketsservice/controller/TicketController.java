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
import com.tick.ticketsservice.service.TicketService;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.addTicket(ticket);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();

    }   

    @GetMapping("/{ticketId}")
    public Ticket getTicket(@PathVariable String ticketId) {
        return ticketService.getTicketByTicketId(ticketId);
    }

    @GetMapping("/userId/{userId}")
    public List<Ticket> getTicketByUserId(@PathVariable String userId) {
        return ticketService.getTicketByUserId(userId);
    }
    
    @PutMapping
    public Ticket modifyTicket(@RequestBody Ticket ticket) {
        return ticketService.updateTicket(ticket);
    }

    //if user asks for a refund
    @PutMapping
    public List<Ticket> ticketsMadeAvailable(@RequestBody String userId) {
        return ticketService.ticketMadeAvailableAgain(userId);
    }

    //if event is cancelled
    @DeleteMapping("/eventId/{eventId}") 
    public String deleteByEventId(@PathVariable String eventId) {
        return ticketService.deleteTicketByEvent(eventId);
    }

    //delete after ticket object belonging to prev user after it has been transferred
    @DeleteMapping("/{ticketId}") 
    public String deleteByTicketId(@PathVariable String ticketId) {
        return ticketService.deleteTicketByTicketId(ticketId);
    }
}
