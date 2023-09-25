package com.tick.ticketsservice.model;

import java.io.Serializable;

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
    private CompositeKey key;
    private String user;
    private String category;

    @Data
    @AllArgsConstructor
    public static class CompositeKey implements Serializable {
        private String eventDate;
        private String section;
        private String row;
        private int seatNumber;
    }
}
