package com.tick.ticketsservice.model;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.*;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDate {

    @Id
    @NotBlank
    private String eventDateID;

    @Null
    private String eventID;
    @NotNull
    private LocalDateTime eventDateTime;
    @Null
    private Map<String, Map<String, Map<String, Integer>>> seatAvailability;

    public EventDate populateEventDate(String eventID,
            Map<String, Map<String, Map<String, Integer>>> map) {
        this.eventID = eventID;
        seatAvailability = map;
        return this;
    }
}
