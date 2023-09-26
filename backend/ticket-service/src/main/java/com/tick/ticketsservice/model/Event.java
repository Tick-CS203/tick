package com.tick.ticketsservice.model;

import java.time.*;
import java.util.Map;
import java.util.List;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
class Links {
    private String websiteURL;
    private String instagramURL;
    private String youtubeURL;
    private String facebookURL;
    private String spotifyURL;
    private String twitterURL;
    private String appleMusicURL;
}

@Document
@Data
@NoArgsConstructor
public class Event {

    @Id
    private int eventID;
    private String name;
    private String description;
    private String category;
    private String banner;
    private String artist;
    private LocalDateTime lastUpdated;
    private List<Price> prices;
    private int ticketLimit;
    private String venueID;
    private Map<String, Map<String, Map<String, Integer>>> seatMap;
    private List<EventDate> date;
    private Links links;

    public Event(String name, String description, String category, String banner, LocalDateTime lastUpdated, List<Price> prices,
            int ticketLimit, String venueId, Map<String, Map<String, Map<String, Integer>>> seatMap, List<EventDate> date, Links links) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.banner = banner;
        this.lastUpdated = lastUpdated;
        this.prices = prices;
        this.ticketLimit = ticketLimit;
        this.venueID = venueID;
        this.seatMap = seatMap;
        this.date = date;
        this.links = links;
    }
}