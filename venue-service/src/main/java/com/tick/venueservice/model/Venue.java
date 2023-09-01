package com.tick.venueservice.model;

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

    public Venue(String name) {
        this.name = name;
    }
}
