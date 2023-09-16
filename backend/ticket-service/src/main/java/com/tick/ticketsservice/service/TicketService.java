package com.tick.ticketsservice.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket addTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketByUserId(String userId) {
        return ticketRepository.findByUserId(userId);
    }

    public Ticket getTicketById(CompositeKey key){
        return ticketRepository.findByKey(key).orElse(null);
    }

    //if user transfers ticket
    public Ticket updateTicket(Ticket updatedTicket) {
        return ticketRepository.save(
                ticketRepository.findByKey(updatedTicket.getKey()).map(
                    ticket -> updatedTicket).orElse(null));
    }

    //if user deactivates account
    public List<Ticket> releaseTicket(String userId) {
         List<Ticket> tickets = ticketRepository.findByUserId(userId);
         for(Ticket ticket : tickets) {
            ticket.setUserId(null);
         }

         return ticketRepository.saveAll(tickets);
    }

    //if event is cancelled
    public String deleteTicketByEvent(String eventId){
        ticketRepository.deleteByEventDateId(eventId);
        return "event" + eventId + "'s tickets have been deleted";
    }

    //if user transfers ticket
    //is it possible for user to get a refund?
    public String deleteTicketByTicketId(CompositeKey key){
        ticketRepository.deleteByKey(key);
        return key + "ticket has been deleted";
    }
}
