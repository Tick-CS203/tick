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
    private String userId;
    private String category;

    @Data
    public static class CompositeKey implements Serializable {
        private String eventDateId;
        private String section;
        private String row;
        private int seatNumber;
    }

    public String getEventDateId() {
        return key.getEventDateId();
    }

    public void setEventDateId(String eventDate) {
        key.setEventDateId(eventDate);
    }

    public String getSection() {
        return key.getSection();
    }

    public void setSection(String section) {
        key.setSection(section);
    }

    public String getRow() {
        return key.getRow();
    }

    public void setRow(String row) {
        key.setRow(row);
    }

    public int getSeatNumber() {
        return key.getSeatNumber();
    }

    public void setSeatNumber(int seatNumber) {
        key.setSeatNumber(seatNumber);
    }
}
