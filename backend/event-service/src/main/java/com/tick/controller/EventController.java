package com.tick.controller;

import java.time.LocalDateTime;
import java.util.*;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.tick.service.*;

import jakarta.validation.Valid;

import com.tick.model.*;

@RestController
@RequestMapping("/event")
@AllArgsConstructor
public class EventController {
    @Autowired
    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Event createEvent(@Valid @RequestBody Event event) {
        return eventService.addEvent(event);
    }

    @GetMapping
    public List<Event> getEvents(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "maxPrice", required = false) Double maxPrice,
            @RequestParam(name = "startDate", required = false) LocalDateTime startDate,
            @RequestParam(name = "endDate", required = false) LocalDateTime endDate) {
        return eventService.filterEvents(category, maxPrice, startDate, endDate);
    }

    @PutMapping
    public Event modifyEvent(@RequestBody Event e) {
        return eventService.updateEvent(e);
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Event upsertEvent(@RequestBody Event e) {
        return eventService.upsert(e);
    }

    @GetMapping("/{id}")
    public Event getEventByID(@PathVariable String id) {
        return eventService.getEventByID(id);
    }

    @DeleteMapping("/{id}")
    public Event deleteEvent(@PathVariable String id) {
        return eventService.deleteEvent(id);
    }

    @PostMapping("/{eventID}")
    @ResponseStatus(HttpStatus.CREATED)
    public Event addEventDate(@PathVariable String eventID, @RequestBody @Valid EventDate date) {
        return eventService.addEventDate(eventID, date);
    }

    @DeleteMapping("/{eventID}/{eventDateID}")
    public Event deleteEventDate(@PathVariable String eventID, @PathVariable String eventDateID) {
        return eventService.deleteEventDate(eventID, eventDateID);
    }

    @GetMapping("/search/{substring}") 
    public List<Event> searchForEventName(@PathVariable String substring) {
        return eventService.searchForEventName(substring);
    }
    
    @GetMapping("/recommend/{artist}")
    public List<Event> getRecommendedEvents(@PathVariable String artist) {
        return eventService.getRecommendedEvents(artist);
    }
}
