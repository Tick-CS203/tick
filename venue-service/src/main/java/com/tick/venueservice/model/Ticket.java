package com.tick.venueservice.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Ticket {

    @Id
    private String id;
    private String eventDateID;
    private String category;
    private String section;
    private String row;
    private Integer seatNumber;
    private String userID;
    private String userName;

    public Ticket(String eventDateID, String category, String section, String row, Integer seatNumber,
            String userID, String userName) {
        this.eventDateID = eventDateID;
        this.category = category;
        this.section = section;
        this.row = row;
        this.seatNumber = seatNumber;
        this.userID = userID;
        this.userName = userName;
    }
}
