package com.tick.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.model.Event;

public interface EventRepository extends MongoRepository<Event, String>, CustomEventRepository {
    
}
