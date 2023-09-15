package com.tick.ticketsservice.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket addTicket(Ticket ticket) {
        ticket.setTicketId(UUID.randomUUID().toString().split("-")[0]);
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketByUserId(String userId) {
        return ticketRepository.findByUserId(userId);
    }

    public Ticket getTicketById(String ticketId){
        return ticketRepository.findById(ticketId).orElse(null);
    }

    //if user transfers ticket
    public Ticket updateTicket(Ticket updatedTicket) {
        return ticketRepository.save(
                ticketRepository.findById(updatedTicket.getTicketId()).map(
                    ticket -> {
                        updatedTicket.setTicketId(ticket.getTicketId());
                        updatedTicket.setEventDateId(ticket.getEventDateId());
                        return updatedTicket;
                    }).orElse(null));
    }

    //if user deactivates account
    public List<Ticket> releaseTicket(String userId){
         List<Ticket> tickets = ticketRepository.findByUserId(userId);
         for(Ticket ticket : tickets) {
            ticket.setUserId(null);
         }

         return ticketRepository.saveAll(tickets);
    }

    //if event is cancelled
    public String deleteTicketByEvent(String eventId){
        ticketRepository.deleteById(eventId);
        return "event" + eventId + "'s tickets have been deleted";
    }

    //if user transfers ticket
    //is it possible for user to get a refund?
    public String deleteTicketByTicketId(String ticketId){
        ticketRepository.deleteById(ticketId);
        return ticketId + "ticket has been deleted";
    }
}
