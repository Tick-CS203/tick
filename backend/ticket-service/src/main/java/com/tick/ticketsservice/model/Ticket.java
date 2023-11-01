package com.tick.ticketsservice.model;

import java.io.Serializable;
import java.time.LocalDateTime;

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
    @NotBlank
    private String category;
    @Null
    private String orderId;
    @Null
    private LocalDateTime orderDateTime;

    @Data
    @AllArgsConstructor
    public static class CompositeKey implements Serializable {
        @NotBlank
        private String eventID;
        @NotBlank
        private String eventDate;
        @NotBlank
        private String section;
        @NotBlank
        private String row;
        @Positive
        private int seatNumber;
    }
}
