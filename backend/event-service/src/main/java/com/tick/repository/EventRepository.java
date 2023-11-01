package com.tick.repository;

import java.util.*;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByCategory(String category);
    Optional<Event> findById(String eventID);
}
