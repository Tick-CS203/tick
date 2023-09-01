package com.tick.service;

import org.yaml.snakeyaml.events.Event;

import com.tick.repository.*;

public class EventService {
    private final EventRepository eventRepository;

    public Event addEvent (Event e) {
        return eventRepository.save(e);
    }

    public List<Event> findAllEvents() {
        return eventRepository.findAll();
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
