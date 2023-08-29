package com.tick.venueservice.model;

import java.util.Map;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Venue {

    @Id
    private String id;

    @Indexed(unique = true)
    private String name;
    private Map<String, Map<String, Map<String, Integer>>> seatMap;

    public Venue(String name, Map<String, Map<String, Map<String, Integer>>> seatMap) {
        this.name = name;
        this.seatMap = seatMap;
    }
}
