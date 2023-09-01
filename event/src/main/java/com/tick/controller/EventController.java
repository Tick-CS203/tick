package com.tick.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {
    private EventService eventService;

    @GetMapping("/event")
    public Event[] getEvents () {
        return 
    }

    @GetMapping("/event/{id}")

    @GetMapping("seat_map")

}
