package com.tick.bookmarks;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String userID;
    @ElementCollection
    @CollectionTable(name = "users_event_list")
    private Set<Long> eventList = new HashSet<>();

    public User(String userID) {
        this.userID = userID;
    }

    private User() {}

    public String getUserID() {
        return userID;
    }

    public Set<Long> getEventList() {
        return eventList;
    }

    public User addEvent(long event) {
        eventList.add(event);
        return this;
    }

    public User removeEvent(long event) {
        eventList.remove(event);
        return this;
    }
}
