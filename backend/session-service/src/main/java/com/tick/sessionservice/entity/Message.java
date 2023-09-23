package com.tick.sessionservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Message {
    private MessageType type;
    private String room;

    public Message(MessageType type, String room) {
        this.type = type;
        this.room = room;
    }

    public Message(MessageType type) {
        this.type = type;
    }
}
