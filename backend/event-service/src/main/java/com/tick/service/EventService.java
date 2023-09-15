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

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> filterEvents(String category, Double maxPrice, LocalDateTime eventDateTime) {
        List<Event> intermediaryEvents = eventRepository.findAll();

        List<Event> intermediaryEvents = eventRepository.findAll();
        Iterator<Event> iter = intermediaryEvents.iterator();
        if (category != null && !category.isEmpty()) {
            while (iter.hasNext()) {
                Event currEvent = iter.next();
                if (!currEvent.getCategory().equals(category)) {
                    iter.remove();
                }
            }
        }

        iter = intermediaryEvents.iterator();
        if (maxPrice != null && maxPrice != 0) {
            while (iter.hasNext()) {
                Event currEvent = iter.next();
                if (!eventHasAPriceLessThanOrEqualToMaxPrice(currEvent, maxPrice)) {
                    iter.remove();
                }
            }
        }

        iter = intermediaryEvents.iterator();
        if (eventDateTime != null){
            while (iter.hasNext()) {
                Event currEvent = iter.next();
                if (!eventHasFilteredDate(currEvent, eventDateTime)){
                    iter.remove();
                }
            }
        }

        return intermediaryEvents;
    }

    public Event getEventByID(Integer eventID) {
        Event event = eventRepository.findById(eventID).get();
        if (event == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
        }
        return eventRepository.findById(eventID).get();
    }

    public Event updateEvent(Event eventRequest) {
        Event existingEvent = eventRepository.findById(eventRequest.getEventID()).get();
        existingEvent.setName(eventRequest.getName());
        existingEvent.setSeatMap(eventRequest.getSeatMap());
        return eventRepository.save(existingEvent);
    }

    public String deleteEvent(Integer eventID) {
        eventRepository.deleteById(eventID);
        return eventID + " event deleted successfully";
    }

    public Boolean eventHasAPriceLessThanOrEqualToMaxPrice(Event event, Double maxPrice) {
        double[] prices = event.getPrice();
        for (double currPrice : prices) {
            if (currPrice <= maxPrice) {
                return true;
            }
        }
        return false;
    }

    public Boolean eventHasFilteredDate(Event event, LocalDateTime eventDate) {
        EventDate[] eventDates = event.getDate();
        for (EventDate currEventDate : eventDates) {
            if (currEventDate.getEventDateTime().equals(eventDate)){
                return true;
            }
        }
        return false;
    }
}
