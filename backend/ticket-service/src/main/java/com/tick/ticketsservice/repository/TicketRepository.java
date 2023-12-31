package com.tick.ticketsservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.ticketsservice.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, Ticket.CompositeKey>{
    List<Ticket> findByUser(String userId);
}
