package com.tick.ticketsservice.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;
import jakarta.validation.Valid;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    @Id
    @Valid
    @NotNull
    private CompositeKey key;
    @NotBlank
    private String user;
    @NotNull
    private String category;
    @NotNull
    private String orderId;
    @NotNull
    private String orderDateTime;

    @Data
    @AllArgsConstructor
    public static class CompositeKey implements Serializable {
        @NotNull
        private String eventID;
        @NotNull
        private String eventDate;
        @NotNull
        private String section;
        @NotNull
        private String row;
        @Positive
        private int seatNumber;
    }
}
