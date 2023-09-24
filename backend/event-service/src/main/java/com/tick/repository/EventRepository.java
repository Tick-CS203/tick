package com.tick.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.model.Event;

public interface EventRepository extends MongoRepository<Event, Integer> {
    List<Event> findByCategory(String category);
    Optional<Event> findById(Integer eventID);
}
