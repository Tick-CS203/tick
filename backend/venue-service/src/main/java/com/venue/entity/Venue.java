package com.venue.entity;

import java.util.*;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import jakarta.validation.constraints.*;

@Document
public class Venue {
    @Id
    @NotNull
    private String venueID;

    @NotNull
    private String name;

    @NotNull
    private Map<String, Map<String, Map<String, Integer>>> seatMap;

    public String getName() {
        return name;
    }

    public Map<String, Map<String, Map<String, Integer>>> getSeatMap() {
        return seatMap;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSeatMap(Map<String, Map<String, Map<String, Integer>>> seatMap) {
        this.seatMap = seatMap;
    }

    public String getVenueID() {
        return venueID;
    }

    public void setVenueID(String venueID) {
        this.venueID = venueID;
    }
}
