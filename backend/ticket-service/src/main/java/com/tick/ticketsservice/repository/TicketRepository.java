package com.tick.ticketsservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.model.Ticket.CompositeKey;

public interface TicketRepository extends MongoRepository<Ticket, Ticket.CompositeKey>{
    List<Ticket> findByUserId(String userId);
    void deleteByEventDateId(String eventDateId);
    Optional<Ticket> findByKey(CompositeKey key);
    void deleteByKey(CompositeKey key);
}
