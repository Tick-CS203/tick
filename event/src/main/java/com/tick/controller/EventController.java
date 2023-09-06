package com.tick.controller;

import java.util.*;
import lombok.AllArgsConstructor;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import com.tick.service.*;
import com.tick.model.*;

@RestController
@RequestMapping("/event")
@AllArgsConstructor
public class EventController {
    //@Autowired
    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) 
    public Event createEvent (@RequestBody Event event) {
        return eventService.addEvent(event);
    }

    @GetMapping
    public List<Event> getEvents (
        @RequestParam(name = "category") String category,
        @RequestParam(name = "maxPrice") double maxPrice
    ) {
        return eventService.filterEvents(category, maxPrice);
    }

    @GetMapping("/{id}")
    public Event getEventByID (@PathVariable Integer id) {
        return eventService.getEventByID(id);
    }

    @PutMapping
    public Event modifyEvent (@RequestBody Event e) {
        return eventService.updateEvent(e);
    }

    @DeleteMapping("/{id}")
    public String deleteEvent (@PathVariable Integer id) {
        return eventService.deleteEvent(id);
    }

}
