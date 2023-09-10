package com.tick.sessionservice.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("Session")
public class Session implements Serializable {
    @Id
    private String id;
    private ArrayList<String> userQueue;
    private HashSet<String> userSet;

    public Session(String id) {
        this.id = id;
        this.userQueue = new ArrayList<>();
        this.userSet = new HashSet<>();
    }
}

