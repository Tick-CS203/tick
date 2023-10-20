package com.venue.entity;

import java.util.*;
import lombok.*;

import org.springframework.data.annotation.Id;

import jakarta.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Venue {
    @Id
    @NotNull
    private String id;

    @NotNull
    private String name;

    @NotNull
    private Map<String, Map<String, Map<String, Integer>>> seatMap;
}
