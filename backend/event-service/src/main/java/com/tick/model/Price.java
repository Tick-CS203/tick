package com.tick.model;

import lombok.Data;

@Data
public class Price {
    private String category;
    private String priceId; // id from stripe
    private double price;
}
