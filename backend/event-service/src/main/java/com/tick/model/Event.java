package com.tick.model;

import java.time.*;
import java.util.Map;
import java.util.List;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Event {

    @Id
    private int eventID;
    private String name;
    private String category;
    private String banner;
    private String artist;
    private LocalDateTime lastUpdated;
    private List<Double> price;
    private int ticketLimit;
    private String venueID;
    private Map<String, Map<String, Map<String, Integer>>> seatMap;
    private List<EventDate> date;

    public Event(String name, String category, String banner, LocalDateTime lastUpdated, List<Double> price,
            int ticketLimit, String venueID, Map<String, Map<String, Map<String, Integer>>> seatMap, List<EventDate> date) {
        this.name = name;
        this.category = category;
        this.banner = banner;
        this.lastUpdated = lastUpdated;
        this.price = price;
        this.ticketLimit = ticketLimit;
        this.venueID = venueID;
        this.seatMap = seatMap;
        this.date = date;
    }
}
