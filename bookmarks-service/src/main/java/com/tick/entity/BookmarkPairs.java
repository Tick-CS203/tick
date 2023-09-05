package com.tick.entity;

import jakarta.persistence.*;

@Entity
@Table
public record BookmarkPairs(String user, long event) {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private static long id;
}
