package com.tick.controller;

import java.time.LocalDateTime;
import java.util.*;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.tick.service.*;
import com.tick.model.*;

@RestController
@AllArgsConstructor
public class EventController {
    @Autowired
    private final EventService eventService;

    @GetMapping
    public String health_check() {
        return "Service is running";
    }

    @PostMapping("/event")
    @ResponseStatus(HttpStatus.CREATED) 
    public Event createEvent (@RequestBody Event event) {
        return eventService.addEvent(event);
    }

    @GetMapping("/event")
    public List<Event> getEvents (
        @RequestParam(name = "category", required = false) String category,
        @RequestParam(name = "maxPrice", required = false) Double maxPrice,
        @RequestParam(name = "eventDateTime", required = false) LocalDateTime eventDateTime
    ) {
        return eventService.filterEvents(category, maxPrice, eventDateTime);
    }

    @PutMapping("/event")
    public Event modifyEvent (@RequestBody Event e) {
        return eventService.updateEvent(e);
    }

    @GetMapping("/event/{id}")
    public Event getEventByID (@PathVariable String id) {
        return eventService.getEventByID(id);
    }

    @DeleteMapping("/event/{id}")
    public String deleteEvent(@PathVariable String id) {
        return eventService.deleteEvent(id);
    }
    
    @PostMapping("/event/recommend")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Event> getRecommendedEvents(@RequestBody Artist artist) {
        return eventService.getRecommendedEvents(artist.getName());
    }
}
