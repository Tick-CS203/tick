package com.venue.repository;

import com.venue.entity.Venue;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VenueRepository extends CrudRepository<Venue, String> {
    public Optional<Venue> findById(String id);
}
