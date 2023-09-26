package com.tick.model;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class EventDate {

    @Id
    private String ID;

    private String eventID;
    private LocalDateTime eventDateTime;
    private Map<String, Map<String, Map<String, Integer>>> seatAvailability;

    public EventDate(String eventID, LocalDateTime eventDateTime, Map<String, Map<String, Map<String, Integer>>> seatAvailability) {
        this.eventID = eventID;
        this.eventDateTime = eventDateTime;
        this.seatAvailability = seatAvailability;
    }
}
