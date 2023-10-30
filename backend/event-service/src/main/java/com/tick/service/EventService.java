package com.tick.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.util.*;

import com.tick.repository.*;
import com.tick.model.*;
import com.tick.exception.ArtistNotFoundException;

@Service
public class EventService {

    private EventRepository eventRepository;
    private String artist_host;

    @Autowired
    public EventService(EventRepository repo, @Value("${ARTIST_HOST}") String artist_host) {
        this.eventRepository = repo;
        this.artist_host = artist_host;
    }

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> filterEvents(String category, Double maxPrice, LocalDateTime eventDateTime) {
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
            }
        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }

    public String deleteEvent(String eventID) {
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
            if (currEventDate.getEventDateTime().equals(eventDate)) {
                return true;
            }
        }
        return false;
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
