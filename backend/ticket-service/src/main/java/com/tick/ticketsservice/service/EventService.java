package com.tick.ticketsservice.service;

import com.tick.ticketsservice.exception.*;
import com.tick.ticketsservice.model.Event;

import org.springframework.web.reactive.function.client.*;
import reactor.core.publisher.Mono;

public class EventService {
    private String host;

    public EventService(String host) {
        this.host = host;
    }

    public Event get(String eventID) {
        try {
            return WebClient.create("http://" + host + ":8080/event/" + eventID)
                .get().exchangeToMono(response -> {
                    if (response.statusCode().value() == 404)
                        return response.createError();
                    return response.bodyToMono(Event.class);
                }).block();
        } catch (WebClientResponseException e) {
            throw new EventNotFoundException();
        }
    }

    public void put(Event event) {
        try {
            WebClient.create("http://" + host + ":8080/event").put()
                .body(Mono.just(event), Event.class).retrieve()
                .bodyToMono(String.class)
                .block();
        } catch (WebClientResponseException e) {
            throw new EventUpdateException();
        }
    }
}
