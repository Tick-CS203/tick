package com.tick.venueservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.venueservice.model.EventDate;

public interface EventDateRepository extends MongoRepository<EventDate, String> {

}
