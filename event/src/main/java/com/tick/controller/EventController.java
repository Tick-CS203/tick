package com.tick.controller;

import java.util.*;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tick.service.*;
import com.tick.model.*;

@RestController
@RequestMapping("api/event")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) 
    public Event createEvent (@RequestBody Event e) {
        return eventService.addEvent(e);
    }

    @GetMapping
    public List<Event> getEvents () {
        return eventService.findAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEventByID (@PathVariable String id) {
        return eventService.getEventByID(id);
    }

    @PutMapping
    public Event modifyEvent (@RequestBody Event e) {
        return eventService.updateEvent(e);
    }

    @DeleteMapping("/{id}")
    public String deleteEvent (@PathVariable String id) {
        return eventService.deleteEvent(id);
    }

}
