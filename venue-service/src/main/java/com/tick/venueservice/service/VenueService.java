package com.tick.venueservice.service;

import java.util.List;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tick.venueservice.model.Venue;
import com.tick.venueservice.repository.VenueRepository;

@Service
@AllArgsConstructor
public class VenueService {

    @Autowired
    private final VenueRepository venueRepository;

    public Venue addVenue(Venue v) {
        return venueRepository.save(v);
    }

    public List<Venue> findAllVenues() {
        return venueRepository.findAll();
    }
    
    public Venue getVenueById(String venueId) {
        return venueRepository.findById(venueId).get();
    }

    public Venue updateVenue(Venue venueRequest) {
        Venue existingVenue = venueRepository.findById(venueRequest.getId()).get();
        existingVenue.setName(venueRequest.getName());
        existingVenue.setSeatMap(venueRequest.getSeatMap());
        return venueRepository.save(existingVenue);
    }

    public String deleteVenue(String venueId) {
        venueRepository.deleteById(venueId);
        return venueId + " venue deleted successfully";
    }
}
