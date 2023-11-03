package com.tick.service;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tick.exception.*;
import com.tick.model.*;
import com.tick.repository.EventRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private VenueRequest venue;

    public Event addEvent(Event event) {
        Map<String, Map<String, Map<String, Integer>>> map = venue.getSeatMap(event.getVenueID());
        event.setSeatMap(map);
        for (EventDate date : event.getDate()) {
            date.setSeatAvailability(map);
        }

        return eventRepository.save(event);
    }

    public Event addEventDate(String eventID, EventDate date) {
        Event event = eventRepository.findById(eventID)
                .orElseThrow(() -> new EventNotFoundException(eventID));
        date.setSeatAvailability(venue.getSeatMap(event.getVenueID()));
        return eventRepository.save(event.addEventDate(date));
    }

    public Event deleteEventDate(String eventID, String eventDateID) {
        Event event = eventRepository.findById(eventID)
                .orElseThrow(() -> new EventNotFoundException(eventID));

        return eventRepository.save(event.removeEventDate(eventDateID));
    }

    public List<Event> filterEvents(String category, Double maxPrice,
            LocalDateTime beforeDate, LocalDateTime afterDate) {
        List<Event> intermediaryEvents = eventRepository.findAll();

        Iterator<Event> iter = intermediaryEvents.iterator();
        boolean categoryFilter = category != null && !category.isEmpty();
        boolean priceFilter = maxPrice != null && maxPrice != 0;

        while (iter.hasNext()) {
            Event currEvent = iter.next();
            if ((categoryFilter && !currEvent.getCategory().equals(category))
                    || (priceFilter && !eventHasAPriceLessThanOrEqualToMaxPrice(currEvent, maxPrice))
                    || (beforeDate != null && !eventHasFilteredDate(currEvent, beforeDate, afterDate)))
                iter.remove();
        }

        return intermediaryEvents;
    }

    public Event getEventByID(String eventID) {
        return eventRepository.findById(eventID).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public Event updateEvent(Event eventRequest) {
        return eventRepository.findById(eventRequest.getEventID()).map(
                event -> {
                    event.setDate(eventRequest.getDate());
                    return eventRepository.save(updateModified(event));
                }).orElseThrow(() -> new EventNotFoundException(eventRequest));
    }

    public Event deleteEvent(String eventID) {
        Event event = eventRepository.findById(eventID);
        eventRepository.deleteById(eventID);
        return event;
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

    public Boolean eventHasFilteredDate(Event event, LocalDateTime beforeDate, LocalDateTime afterDate) {
        List<EventDate> eventDates = event.getDate();
        for (EventDate currEventDate : eventDates) {
            LocalDateTime dateTime = currEventDate.getEventDateTime();
            if (dateTime.isAfter(beforeDate) &&
                    dateTime.isBefore(afterDate)) {
                return true;
            }
        }
        return false;
    }

    public Event upsert(Event e) {
        Event existingEvent = getEventByID(e.getEventID());
        existingEvent.upsert(e);
        return eventRepository.save(updateModified(existingEvent));
    }

    private Event updateModified(Event e) {
        e.setLastUpdated(LocalDateTime.now());
        return e;
    }
}
