package com.tick.model;

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
    private double[] price;
    private int ticketLimit;
    private String venueID;
    private Map<String, Map<String, Map<String, Integer>>> seatMap;
    private LocalDate[] date;

    public Event(String name, String category, String banner, LocalDateTime lastUpdated, double[] price,
            int ticketLimit, String venueID, Map<String, Map<String, Map<String, Integer>>> seatMap, LocalDate[] date) {
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
