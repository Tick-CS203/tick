package com.tick.ticketsservice.model;

import lombok.Data;

@Data
public class Price {
    private String category;
    private String priceID; // id from stripe
    private double price;
}
