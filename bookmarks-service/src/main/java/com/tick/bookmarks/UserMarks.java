package com.tick.bookmarks;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
public class UserMarks {
    @Id
    private String userID;
    @ElementCollection
    private Set<Long> eventList = new HashSet<>();

    public UserMarks(String userID) {
        this.userID = userID;
    }

    private UserMarks() {}

    public String getUserID() {
        return userID;
    }

    public Set<Long> getEventList() {
        return eventList;
    }

    public UserMarks addEvent(Bookmark mark) {
        eventList.add(mark.event());
        return this;
    }
}
