package com.tick.bookmarks.entity;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "bookmark")
public class Bookmark {
    @Id
    private String userID;
    @ElementCollection
    @CollectionTable(name = "users_event_list")
    private Set<String> eventList = new HashSet<>();

    public Bookmark(String userID) {
        this.userID = userID;
    }

    private Bookmark() {}

    public String getUserID() {
        return userID;
    }

    public Set<String> getEventList() {
        return eventList;
    }

    public Bookmark addEvent(String event) {
        eventList.add(event);
        return this;
    }

    public Bookmark removeEvent(String event) {
        eventList.remove(event);
        return this;
    }
}
