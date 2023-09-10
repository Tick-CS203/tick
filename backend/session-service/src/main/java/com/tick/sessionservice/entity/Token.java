package com.tick.sessionservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Token extends Message {
    private String token;

    public Token(MessageType type, String token) {
        super(type);
        this.token = token;
    }
}
