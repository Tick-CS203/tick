package com.tick.eventdateservice.model;

import java.time.*;
import java.util.Map;
import lombok.Data;

@Data
public class Event {
    private int eventID;
    private String name;
    private String category;
    private String banner;
    private LocalDateTime lastUpdated;
    private int ticketLimit;
    private String venueID;
    private Map<String, Map<String, Map<String, Integer>>> seatMap;
    private LocalDate[] dates;

    public Event(String name, String category, String banner, LocalDateTime lastUpdated,
            int ticketLimit, String venueID, Map<String, Map<String, Map<String, Integer>>> seatMap, LocalDate[] dates) {
        this.name = name;
        this.category = category;
        this.banner = banner;
        this.lastUpdated = lastUpdated;
        this.ticketLimit = ticketLimit;
        this.venueID = venueID;
        this.seatMap = seatMap;
        this.dates = dates;
    }
}

