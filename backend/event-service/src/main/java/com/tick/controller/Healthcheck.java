package com.tick.controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class Healthcheck {
    @GetMapping
    public String health_check() {
        return "Event service is running";
    }
}
