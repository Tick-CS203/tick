package com.venue.repository;

import com.venue.entity.Venue;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface VenueRepository extends MongoRepository<Venue, String> {
    public Optional<Venue> findById(String id);

    public Venue save(Venue venue);

    public List<Venue> findAll();

    public void deleteById(String id);
}
