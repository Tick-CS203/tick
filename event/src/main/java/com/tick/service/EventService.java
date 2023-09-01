package com.tick.service;

import org.yaml.snakeyaml.events.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

import com.tick.repository.*;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private MongoTemplate mongoTemplate;

    public Event addEvent (Event event) {
        return eventRepository.save(event);
    }

    public List<Event> filterEvents(String category, double maxPrice) {
        Query query = new Query();

        if (category != null) {
            query.addCriteria(Criteria.where("category").is(category));
        } 
        if (maxPrice != null) {
            query.addCriteria(Criteria.where("price").elemMatch(Criteria.lte(maxPrice)));
        }
        return mongoTemplate.find(query, Event.class);
    }

    public Event getEventByID (String eventID) {
        return eventRepository.findById(eventID);
    }

    public Event updateEvent (Event eventRequest) {
        Event existingEvent = eventRepository.findById(eventRequest.getEventId()).get();
        existingEvent.setName(eventRequest.getName());
        existingEvent.setSeatMap(eventRequest.getSeatMap());
        return eventRepository.save(existingEvent);
    }

    public String deleteEvent (String eventID) {
        eventRepository.deleteById(eventID);
        return eventID + " event deleted successfully";
    }

}
