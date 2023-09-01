package com.tick.venueservice.controller;

import java.util.List;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tick.venueservice.model.Venue;
import com.tick.venueservice.service.VenueService;

@RestController
@RequestMapping("api/venue")
@AllArgsConstructor
public class VenueController {
    private final VenueService venueService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.addVenue(venue);
    }

    @GetMapping
    public List<Venue> getVenues() {
        return venueService.findAllVenues();
    }
 
    @GetMapping("/{id}")
    public Venue getVenueById(@PathVariable String id) {
        return venueService.getVenueById(id);
    }

    @PutMapping
    public Venue modifyVenue(@RequestBody Venue venue) {
        return venueService.updateVenue(venue);
    }

    @DeleteMapping("/{id}")
    public String deleteVenue(@PathVariable String id) {
        return venueService.deleteVenue(id);
    }
}
