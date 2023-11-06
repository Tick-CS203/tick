package com.venue.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheck {
    @GetMapping
    public String health_check() {
        return "Venue service is running";
    }
}

