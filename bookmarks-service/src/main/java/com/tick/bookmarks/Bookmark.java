package com.tick.bookmarks;

import jakarta.persistence.*;

@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String userid;
    private long event;

    public Bookmark(String userid, long event) {
        this.userid = userid;
        this.event = event;
    }

    private Bookmark() {}

    public String getUserid() {
        return userid;
    }

    public long getEvent() {
        return event;
    }

}
