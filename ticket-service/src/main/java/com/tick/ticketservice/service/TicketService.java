package com.tick.ticketservice.service;

import java.util.List;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tick.ticketservice.model.Ticket;
import com.tick.ticketservice.repository.TicketRepository;

@Service
@AllArgsConstructor
public class TicketService {

    @Autowired
    private final TicketRepository ticketRepository;

    public Ticket addTicket(Ticket v) {
        return ticketRepository.save(v);
    }

    public List<Ticket> findAllTickets() {
        return ticketRepository.findAll();
    }
    
    public Ticket getTicketById(String ticketId) {
        return ticketRepository.findById(ticketId).get();
    }

    public Ticket updateTicket(Ticket ticketRequest) {
        Ticket existingTicket = ticketRepository.findById(ticketRequest.getId()).get();
        existingTicket.setEventDateID(ticketRequest.getEventDateID());
        existingTicket.setCategory(ticketRequest.getCategory());
        existingTicket.setSection(ticketRequest.getSection());
        existingTicket.setRow(ticketRequest.getRow());
        existingTicket.setSeatNumber(ticketRequest.getSeatNumber());
        existingTicket.setUserID(ticketRequest.getUserID());
        return ticketRepository.save(existingTicket);
    }

    public String deleteTicket(String ticketId) {
        ticketRepository.deleteById(ticketId);
        return ticketId + " ticket deleted successfully";
    }
}
