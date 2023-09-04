package com.tick.sessionservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QueueNo extends Message {
    private int queue_no;

    public QueueNo(MessageType type, int queue_no) {
        super(type);
        this.queue_no = queue_no;
    }
}
