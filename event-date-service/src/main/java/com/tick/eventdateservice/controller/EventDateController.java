package com.tick.eventdateservice.controller;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tick.eventdateservice.model.EventDate;
import com.tick.eventdateservice.model.SelectedRow;
import com.tick.eventdateservice.service.EventDateService;

@RestController
@RequestMapping("api/eventdate")
@AllArgsConstructor
public class EventDateController {
    private final EventDateService eventDateService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventDate createEventDate(@RequestBody EventDate eventDate) {
        return eventDateService.addEventDate(eventDate);
    }

    @GetMapping("/{id}")
    public Map<String, Map<String, Map<String, Integer>>> getSeatAvailability(@PathVariable String id) {
        return eventDateService.getSeatAvailability(id);
    }

    @PostMapping("/{id}")
    public List<Ticket> allocateSeats(@PathVariable String id, @RequestBody List<SelectedRow> selectedRows) {
        return eventDateService.allocateSeats(id, selectedRows);
    }
    
    @DeleteMapping("/{id}")
    public String deleteEventDate(@PathVariable String id) {
        return eventDateService.deleteEventDate(id);
    }
}
