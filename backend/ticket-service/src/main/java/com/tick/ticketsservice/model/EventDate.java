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
public class EventDate {

    @Id
    @NotBlank
    private String ID;

    @Null
    private String eventID;
    @NotNull
    private LocalDateTime eventDateTime;
    @Null
    private Map<String, Map<String, Map<String, Integer>>> seatAvailability;
}
