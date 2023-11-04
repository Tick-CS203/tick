package com.tick.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.*;

import java.time.LocalDateTime;
import java.util.*;


import com.tick.exception.*;
import com.tick.model.*;
import com.tick.repository.EventRepository;

import com.tick.exception.ArtistNotFoundException;

@Service
public class EventService {
    private EventRepository eventRepository;
    private VenueRequest venue;
    private String artist_host;

    @Autowired
    public EventService(EventRepository repo, VenueRequest venue, @Value("${ARTIST_HOST}") String artist_host) {
        this.eventRepository = repo;
        this.artist_host = artist_host;
        this.venue = venue;
    }

    public Event addEvent(Event event) {
        Map<String, Map<String, Map<String, Integer>>> map = venue.getSeatMap(event.getVenueID());
        event.setSeatMap(map);
        String eventID = event.getEventID();
        for (EventDate date : event.getDate()) {
            date.populateEventDate(eventID, map);
        }

        return eventRepository.save(updateModified(event));
    }

    public Event addEventDate(String eventID, EventDate date) {
        Event event = getEventByID(eventID);
        Map<String, Map<String, Map<String, Integer>>> map = venue.getSeatMap(event.getVenueID());
        return eventRepository.save(
                updateModified(event.addEventDate(date.populateEventDate(eventID, map))));
    }

    public Event deleteEventDate(String eventID, String eventDateID) {
        Event event = getEventByID(eventID);

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
        if (eventID == null) throw new EventNotFoundException();
        return eventRepository.findById(eventID).orElseThrow(
                () -> new EventNotFoundException());
    }

    public Event updateEvent(Event eventRequest) {
        return eventRepository.findById(eventRequest.getEventID()).map(
                event -> {
                    event.setDate(eventRequest.getDate());
                    return eventRepository.save(updateModified(event));
                }).orElseThrow(() -> new EventNotFoundException(eventRequest));
    }

    public Event deleteEvent(String eventID) {
        Event event = getEventByID(eventID);
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

    public List<Event> searchForEventName(String substring) {
        return eventRepository.findByNameRegex(substring);
    }

    @SuppressWarnings("unchecked")
    public List<Event> getRecommendedEvents(String artist) {
        List<Event> recommendedEvents = new ArrayList<>();

        try {
            List<String> recommendedArtists = WebClient.create("http://" + artist_host + ":5000/recommend")
                .post()
                .body(BodyInserters.fromFormData("artist", artist))
                .exchangeToMono(response -> {
                    if (response.statusCode().value() == 404)
                        return response.createError();
                    return response.bodyToMono(List.class);
                    }).block();
            
            for (String recommendedArtist : recommendedArtists) {
                List<Event> event = eventRepository.findByArtist(recommendedArtist);
                if (event.size() >= 1) {
                    recommendedEvents.add(event.get(0));
                }
            } 
        } catch (WebClientResponseException e) {
            throw new ArtistNotFoundException();
        }
        return recommendedEvents;
    }
}
