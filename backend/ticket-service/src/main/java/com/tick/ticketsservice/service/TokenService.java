package com.tick.ticketsservice.service;

import com.tick.ticketsservice.model.TokenResponse;
import com.tick.ticketsservice.exception.*;

import org.springframework.web.reactive.function.client.*;
import reactor.core.publisher.Mono;

public class TokenService {
    private String host;

    public TokenService(String host) {
        this.host = host;
    }

    public String post(String token, String type) {
        try {
        return WebClient.create("http://" + host + ":8080/token/" + type)
            .post().body(Mono.just("{\"token\":\""+token+"\"}"), String.class)
            .header("Content-Type", "application/json")
            .exchangeToMono(response -> {
                if (response.statusCode().value() == 400)
                    return response.createError();
                return response.bodyToMono(TokenResponse.class);
            }).block().id();
        } catch (WebClientResponseException e) {
            throw new UnauthorisedException();
        }
    }
}
