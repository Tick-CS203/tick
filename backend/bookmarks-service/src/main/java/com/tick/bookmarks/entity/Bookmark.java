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
    private Set<Long> eventList = new HashSet<>();

    public Bookmark(String userID) {
        this.userID = userID;
    }

    private Bookmark() {}

    public String getUserID() {
        return userID;
    }

    public Set<Long> getEventList() {
        return eventList;
    }

    public Bookmark addEvent(long event) {
        eventList.add(event);
        return this;
    }

    public Bookmark removeEvent(long event) {
        eventList.remove(event);
        return this;
    }
}
