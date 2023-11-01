package com.tick.ticketsservice.model;

import java.time.*;
import java.util.*;

import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.*;
import jakarta.validation.constraints.*;

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
@AllArgsConstructor
public class Event {
    @Id
    @NotBlank
    private String eventID;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private String category;
    @NotBlank
    private String banner;
    @NotBlank
    private String artist;
    @Null
    private LocalDateTime lastUpdated;
    private List<Price> prices;
    @Min(value = 1)
    private int ticketLimit;
    @NotBlank
    private String venueID;
    @Null
    private Map<String, Map<String, Map<String, Integer>>> seatMap;
    @NotEmpty
    private List<@Valid EventDate> date;
    private Links links;
}