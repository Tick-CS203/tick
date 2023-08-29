package com.tick.venueservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.venueservice.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    
}
