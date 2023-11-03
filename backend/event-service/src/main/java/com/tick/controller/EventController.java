package com.tick.controller;

import java.time.LocalDateTime;
import java.util.*;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
            @RequestParam(name = "beforeDate", required = false) LocalDateTime beforeDate,
            @RequestParam(name = "afterDate", required = false) LocalDateTime afterDate) {
        if ((beforeDate == null || afterDate == null) && (beforeDate != afterDate))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Both beforeDate and afterDate must be set");
        return eventService.filterEvents(category, maxPrice, beforeDate, afterDate);
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
}
