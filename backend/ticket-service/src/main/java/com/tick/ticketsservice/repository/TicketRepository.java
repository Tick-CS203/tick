package com.tick.ticketsservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.ticketsservice.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String>{
    List<Ticket> findByUserId(String userId);
    Optional<Ticket> findById(String Id);
}
