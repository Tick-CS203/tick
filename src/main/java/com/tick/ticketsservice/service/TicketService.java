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

    public Ticket addTicket(Ticket ticket) {
        ticket.setTicketId(UUID.randomUUID().toString().split("-")[0]);
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public List<Ticket> getTicketByUserId(String userId) {
        return ticketRepository.findByUserId(userId);
    }
    public Ticket getTicketByTicketId(String ticketId){
        return ticketRepository.findById(ticketId).get();
    }

    //if user transfers ticket
    public Ticket updateTicket(Ticket updatedTicket) {
        Ticket existingTicket = ticketRepository.findById(updatedTicket.getTicketId()).get();
        existingTicket.setUserId(updatedTicket.getUserId());
        existingTicket.setCategory(updatedTicket.getCategory());
        existingTicket.setSection(updatedTicket.getSection());
        existingTicket.setRow(updatedTicket.getRow());
        existingTicket.setSeatNumber(updatedTicket.getSeatNumber());
        return ticketRepository.save(existingTicket);
    }

    //if user deactivates account
    public List<Ticket> ticketMadeAvailableAgain(String userId){
         List<Ticket> ticketBelongingToUser = ticketRepository.findByUserId(userId);
         for(Ticket ticket : ticketBelongingToUser) {
            ticket.setUserId(null);
         }
         return ticketRepository.saveAll(ticketBelongingToUser);
    }

    //if event is cancelled
    public String deleteTicketByEvent(String eventId){
        ticketRepository.deleteById(eventId); 
        return "event" + eventId + "'s tickets have been deleted";
    }

    //if user transfers ticket
    //is it possible for user to get a refurn?
    public String deleteTicketByTicketId(String ticketId){
        ticketRepository.deleteById(ticketId); 
        return ticketId + "ticket has been deleted";
    }
}
