package com.tick.bookmarks;

import org.springframework.web.bind.annotation.*;

@RestController
public class Healthcheck {
    @GetMapping
    public String health_check() {
        return "Bookmarks service is running";
    }
}
