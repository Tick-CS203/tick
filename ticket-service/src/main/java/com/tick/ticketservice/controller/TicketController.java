package com.tick.ticketservice.controller;

import java.util.List;
import lombok.AllArgsConstructor;

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

import com.tick.ticketservice.model.Ticket;
import com.tick.ticketservice.service.TicketService;

@RestController
@RequestMapping("api/ticket")
@AllArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.addTicket(ticket);
    }

    @GetMapping
    public List<Ticket> getTickets() {
        return ticketService.findAllTickets();
    }

    @GetMapping("/{id}")
    Ticket getTicketById(@PathVariable String id) {
        return ticketService.getTicketById(id);
    }

    @PutMapping
    public Ticket modifyTicket(@RequestBody Ticket ticket) {
        return ticketService.updateTicket(ticket);
    }

    @DeleteMapping("/{id}")
    public String deleteTicket(@PathVariable String id) {
        return ticketService.deleteTicket(id);
    }

    @PostMapping("/{recaptchaToken}")
    public Object verifyRecaptcha(@PathVariable String recaptchaToken) {
        return ticketService.verifyRecaptcha(recaptchaToken);
    }
}
