package com.tick.ticketsservice.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheck {
    @GetMapping
    public String health_check() {
        return "Ticket service is running";
    }
}

