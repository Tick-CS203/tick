package com.tick.controller;
import org.springframework.web.bind.annotation.*;

public class Healthcheck {
    @GetMapping
    public String health_check() {
        return "Event service is running";
    }
}
