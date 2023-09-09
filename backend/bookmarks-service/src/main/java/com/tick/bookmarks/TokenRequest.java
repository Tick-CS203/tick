package com.tick.bookmarks;

import java.util.Map;
import java.util.HashMap;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class TokenRequest {
    private String host;

    public TokenRequest() {
        host = System.getenv("TOKEN");
    }

    public String post(String token) throws IllegalArgumentException {
        if (token == null) throw new IllegalArgumentException();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Token> entity = new HttpEntity<>(new Token(token), headers);
        RestTemplate rest = new RestTemplate();

        String url = "http://" + host + ":8080/token/access";

        try {
            ResponseEntity<TokenResponse> response = rest.postForEntity(url, entity, TokenResponse.class);
            return response.getBody().id();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalArgumentException();
        }
    }
}

record Token(String token) {}
record TokenResponse(String id, String token, long expiry) {};
