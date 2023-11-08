package com.venue.controller;

import java.util.*;

import com.venue.service.VenueService;
import com.venue.entity.Venue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/venue")
public class VenueController {
    private VenueService service;

    @Autowired
    public VenueController(VenueService service) {
        this.service = service;
    }

    @GetMapping
    public List<Venue> getAllVenue() {
        return service.getAllVenue();
    }

    @GetMapping("/{id}")
    public Venue getVenue(@PathVariable("id") String id) {
        return service.getVenue(id);
    }

    @PostMapping
    public Venue createVenue(@RequestBody @Valid Venue venue) {
        return service.createVenue(venue);
    }

    @DeleteMapping("/{id}")
    public Venue deleteVenue(@PathVariable("id") String id) {
        return service.deleteVenue(id);
    }
}
