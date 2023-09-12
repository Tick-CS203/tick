package com.tick.ticketservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.ticketservice.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {

}
