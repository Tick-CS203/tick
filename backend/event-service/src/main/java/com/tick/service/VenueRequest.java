package com.tick.service;

import com.tick.exception.VenueNotFoundException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.*;

@Component
public class VenueRequest {
    private String host;

    public VenueRequest(@Value("${VENUE_HOST}") String host) {
        this.host = host;
    }

    public Map<String, Map<String, Map<String, Integer>>> getSeatMap(String venueID) {
        String url = "http://" + host + ":8080/venue/" + venueID;
        try {
            Map<?, ?> map = WebClient.create(url).get()
            .exchangeToMono(response -> {
                if (response.statusCode().value() == 404) {
                    return response.createError();
                }
                return response.bodyToMono(Map.class);
            }).block();
            return (Map<String, Map<String, Map<String, Integer>>>) map;
        } catch (WebClientResponseException e) {
            throw new VenueNotFoundException();
        }
    }
}
