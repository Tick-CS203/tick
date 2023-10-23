package com.venue.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.venue.repository.VenueRepository;
import com.venue.entity.Venue;
import com.venue.exception.VenueNotFoundException;

@Service
public class VenueService {
    private VenueRepository repo;

    public VenueService(VenueRepository repo) {
        this.repo = repo;
    }

    public List<Venue> getAllVenue() {
        return repo.findAll();
    }

    public Venue getVenue(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new VenueNotFoundException());
    }

    public Venue createVenue(Venue venue) {
        return repo.save(venue);
    }

    public Venue deleteVenue(String id) {
        Venue venue = repo.findById(id)
                .orElseThrow(() -> new VenueNotFoundException());
        repo.deleteById(id);
        return venue;
    }
}
