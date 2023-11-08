package com.tick.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    public Map<?, ?> getVenue(String venueID) throws JsonProcessingException {
        String url = "http://" + host + ":8080/venue/" + venueID;
        try {
            String map = WebClient.create(url).get()
                    .exchangeToMono(response -> {
                        if (response.statusCode().value() == 404) {
                            return response.createError();
                        }
                        return response.bodyToMono(String.class);
                    }).block();
            return new ObjectMapper().readValue(map, new TypeReference<Map>(){});
        } catch (WebClientException e) {
            throw new VenueNotFoundException(venueID);
        }
    }

    public Map<String, Map<String, Map<String, Integer>>> getSeatMap(String venueID) {
        try {
            return (Map<String, Map<String, Map<String, Integer>>>) getVenue(venueID).get("seatMap");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
