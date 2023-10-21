package com.tick.service;

import com.tick.model.Event;
import com.tick.model.EventDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.*;

import com.tick.repository.*;
import com.tick.model.*;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private VenueRequest venue;

    public Event addEvent(Event event) {
        event.setSeatMap(venue.getSeatMap(event.getVenueID()));
        return eventRepository.save(event);
    }

    public List<Event> filterEvents(String category, Double maxPrice, LocalDateTime eventDateTime) {
        List<Event> intermediaryEvents = eventRepository.findAll();

        Iterator<Event> iter = intermediaryEvents.iterator();
        boolean categoryFilter = category != null && !category.isEmpty();
        boolean priceFilter = maxPrice != null && maxPrice != 0;

        while (iter.hasNext()) {
            Event currEvent = iter.next();
            if ((categoryFilter && !currEvent.getCategory().equals(category))
                    || (priceFilter && !eventHasAPriceLessThanOrEqualToMaxPrice(currEvent, maxPrice))
                    || (eventDateTime != null
                        && !eventHasFilteredDate(currEvent, eventDateTime))) {
                iter.remove();
                        }
        }

        return intermediaryEvents;
    }

    public Event getEventByID(String eventID) {
        return eventRepository.findById(eventID).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found")
                );
    }

    public Event updateEvent(Event eventRequest) {
        if (eventRequest.getEventID() == null) 
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "eventID field must be provided");
        return eventRepository.findById(eventRequest.getEventID()).map(
                event -> {
                    event.setDate(eventRequest.getDate());
                    return eventRepository.save(event);
                }).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public String deleteEvent(String eventID) {
        if (!eventRepository.findById(eventID).isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not");
        }

        eventRepository.deleteById(eventID);
        return eventID + " event deleted successfully";
    }

    public Boolean eventHasAPriceLessThanOrEqualToMaxPrice(Event event, Double maxPrice) {
        List<Price> prices = event.getPrices();
        for (Price currPrice : prices) {
            if (currPrice.getPrice() <= maxPrice) {
                return true;
            }
        }
        return false;
    }

    public Boolean eventHasFilteredDate(Event event, LocalDateTime eventDate) {
        List<EventDate> eventDates = event.getDate();
        for (EventDate currEventDate : eventDates) {
            if (currEventDate.getEventDateTime().equals(eventDate)){
                return true;
            }
        }
        return false;
    }
}
