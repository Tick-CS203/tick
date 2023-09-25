package com.tick.ticketsservice.model;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
public class EventDate {

    @Id
    private String id;

    private String eventID;
    private LocalDateTime eventDateTime;
    private Map<String, Map<String, Map<String, Integer>>> seatAvailability;

    public EventDate(String eventID, LocalDateTime eventDateTime, Map<String, Map<String, Map<String, Integer>>> seatAvailability) {
        this.eventID = eventID;
        this.eventDateTime = eventDateTime;
        this.seatAvailability = seatAvailability;
    }
}