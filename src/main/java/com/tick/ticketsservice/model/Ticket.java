package com.tick.ticketsservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Ticket {
    @Id
    private String ticketId;
    private String userId;
    private String eventDateId;
    private String category;
    private String section;
    private String row;
    private int seatNumber;
}
