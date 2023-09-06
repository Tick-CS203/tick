package com.tick.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.model.Event;

public interface EventRepository extends MongoRepository<Event, Integer> {

    List<Event> findByCategory(String category);

    // List<Event> findByPriceLessThanOrEqual(double maxPrice);
}
