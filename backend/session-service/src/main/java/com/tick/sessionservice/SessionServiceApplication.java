package com.tick.sessionservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@RestController
public class SessionServiceApplication {
    private String tokenHost;
    private String tokenPort;

    public SessionServiceApplication(@Value("${TOKEN_HOST}") String tokenHost,
            @Value("${TOKEN_PORT}") String tokenPort) {
        this.tokenHost = tokenHost;
        this.tokenPort = tokenPort;
    }

    @Bean
    public WebClient getWebClientBuilder() {
        return WebClient.builder().baseUrl("http://" + tokenHost + ":" + tokenPort).build();
    }

    @GetMapping("/")
    public String ping() {
        return "hello";
    }

    public static void main(String[] args) {
        SpringApplication.run(SessionServiceApplication.class, args);
    }

}
