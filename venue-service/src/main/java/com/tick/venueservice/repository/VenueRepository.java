package com.tick.venueservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tick.venueservice.model.Venue;

public interface VenueRepository extends MongoRepository<Venue, String> {

}
