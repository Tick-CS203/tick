package com.tick.sessionservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserData extends Message {
    private String userId;

    public UserData(MessageType type, String room, String userId) {
        super(type, room);
        this.userId = userId;
    }
}
