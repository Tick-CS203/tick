package com.tick.bookmarks.service;

import com.tick.bookmarks.exceptions.*;

import reactor.core.publisher.Mono;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.reactive.function.client.*;

@Component
public class EventRequest {
    private String host;

    @Autowired
    public EventRequest(@Value("${EVENT_HOST}") String host) {
        this.host = host;
    }

    public void post(long event) {
        String url = "http://" + host + ":8080/event/" + event;
        try {
            Object something = WebClient.create(url).get()
                .exchangeToMono(response -> {
                    if (response.statusCode().value() == 404) {
                        return response.createError();
                    }
                    return response.bodyToMono(Object.class);
                }).block();
        } catch (WebClientResponseException e) {
            throw new EventNotFoundException();
        }
    }
}
