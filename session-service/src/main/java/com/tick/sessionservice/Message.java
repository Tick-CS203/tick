package com.tick.sessionservice;

import lombok.Data;

@Data
// make sep type for enter session message and queue no message
public class Message {
    private MessageType type;
    private String userId;
    private String room;
    private Integer queue_no;

    public Message() {
    }

    public Message(MessageType type, String userId) {
        this.type = type;
        this.userId = userId;
    }

    public Message(MessageType type, int queue_no) {
        this.type = type;
        this.queue_no = queue_no;
    }
}
