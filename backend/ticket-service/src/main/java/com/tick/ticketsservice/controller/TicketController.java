package com.tick.ticketsservice.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.tick.ticketsservice.model.*;
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

    @GetMapping("/user")
    public List<Ticket> getTicketByUserId(
            @RequestHeader Map<String, String> headers) {

            String token = headers.get("authorization");
            return ticketService.getTicketByUserId(token);
            }

    //if user asks for a refund
    @DeleteMapping("/user")
    public List<Ticket> ticketsMadeAvailable(
            @RequestHeader Map<String, String> headers) {

            String token = headers.get("authorization");
            return ticketService.releaseTicket(token);
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

    @PostMapping("/recaptcha")
    public Object verifyRecaptcha(@RequestBody RecaptchaRequest recaptchaRequest) {
        return ticketService.verifyRecaptcha(recaptchaRequest);
    }

    @PostMapping("/allocate/{id}/{date}")
    public List<Ticket> allocateSeats(@PathVariable String id,
            @PathVariable String date,
            @RequestBody List<SelectedRow> selectedRows,
            @RequestHeader Map<String, String> headers) {
            String token = headers.get("authorization");

            return ticketService.allocateSeats(id, date, selectedRows, token);
    }
}
