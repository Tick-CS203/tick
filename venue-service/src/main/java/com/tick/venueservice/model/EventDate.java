package com.tick.venueservice.model;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class EventDate {

    @Id
    private String id;

    private String eventID;
    private String venueID;
    private LocalDateTime eventDateTime;
    private Map<String, Map<String, Map<String, Integer>>> seatAvailability;

    public EventDate(String eventID, String venueID, LocalDateTime eventDateTime, Map<String, Map<String, Map<String, Integer>>> seatAvailability) {
        this.eventID = eventID;
        this.venueID = venueID;
        this.eventDateTime = eventDateTime;
        this.seatAvailability = seatAvailability;
    }
}
