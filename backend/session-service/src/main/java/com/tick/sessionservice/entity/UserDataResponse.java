package com.tick.sessionservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDataResponse {
    private String id;
    private String token;
    private long expiry;
}
