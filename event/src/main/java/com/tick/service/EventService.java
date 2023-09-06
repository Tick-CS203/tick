package com.tick.service;

import com.tick.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.*;
import java.util.stream.Collectors;

import com.tick.repository.*;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    private MongoTemplate mongoTemplate;

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> filterEvents(String category, double maxPrice) {
        Query query = new Query();
        List<Event> intermediaryEvents = new ArrayList<> ();

        // if (category != null) {
        //     query.addCriteria(Criteria.where("category").is(category));
        // }

        if (maxPrice != 0) {
            // how to query for category starting from this filtered list alr?
            // how do i get all the events to check them in the first place?
            List<Event> allEvents = eventRepository.findAll();
            for (Event currEvent : allEvents) {
                if (currEvent.eventHasAPriceLessThanOrEqualToMaxPrice(maxPrice)) {
                    intermediaryEvents.add(currEvent);
                }
            }
        }

        List<Event> filteredEvents = intermediaryEvents.stream()
                .filter(event -> event.getCategory().equals(category))
                .collect(Collectors.toList());

        //return mongoTemplate.find(query, Event.class);
        return filteredEvents;
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

    // does this go under event or event service?
    public Boolean eventHasAPriceLessThanOrEqualToMaxPrice(Integer id, double maxPrice){
        double[] prices = eventRepository.findById(id).get().getPrice();
        for (double currPrice : prices) {
            if (currPrice <= maxPrice) {
                return true;
            }
        }
        return false;
    }

}
