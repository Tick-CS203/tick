package com.tick.tokens;

import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheck {
    @GetMapping
    public String health_check() {
        return "Token service is running";
    }
}

