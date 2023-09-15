package com.tick.sessionservice.entity;

import lombok.Data;

@Data
public class TokenResponse {
    private String token;
    private int validity;
}
