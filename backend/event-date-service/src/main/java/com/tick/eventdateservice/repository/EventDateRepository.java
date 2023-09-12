package com.tick.eventdateservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.eventdateservice.model.EventDate;

public interface EventDateRepository extends MongoRepository<EventDate, String> {

}
