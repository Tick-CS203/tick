package com.tick.sessionservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserData extends Message {
    private String token;

    public UserData(MessageType type, String room, String token) {
        super(type, room);
        this.token = token;
    }
}
