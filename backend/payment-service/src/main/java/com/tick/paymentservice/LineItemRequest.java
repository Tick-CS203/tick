package com.tick.paymentservice;

import lombok.Data;

@Data
public class LineItemRequest {
    private Long quantity;
    private String priceID;
}
