package com.tick.bookmarks;

import java.util.Map;
import java.util.HashMap;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

public class TokenRequest {
    public static String post(String token) throws IllegalArgumentException {
        if (token == null) throw new IllegalArgumentException();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Token> entity = new HttpEntity<>(new Token(token), headers);
        RestTemplate rest = new RestTemplate();

        String url = "http://token:8080/token/access";

        ResponseEntity<Userobj> response = rest.postForEntity(url, entity, Userobj.class);
        int status = response.getStatusCode().value();
        if (status == 200) return response.getBody().id();
        throw new IllegalArgumentException();
    }
}
