package com.tick.bookmarks;

import com.tick.exceptions.*;
import java.util.Map;
import java.util.HashMap;
import java.io.IOException;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;

@Component
public class Request {
    private Map<Host, String> hostmap;

    public Request() {
        hostmap = new HashMap<>();
        hostmap.put(Host.TOKEN, "http://" + System.getenv("TOKEN_HOST") + ":8080/token/access");
        hostmap.put(Host.EVENT, "http://" + System.getenv("EVENT_HOST") + ":8080/event/");
    }

    public String post(Host host, Object message) {
        if (message == null) throw new IllegalArgumentException();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate rest = new RestTemplate();
        rest.setErrorHandler(new DefaultResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse response) throws IOException {
                return false;
            }
        });

        String url = hostmap.get(host);
        switch (host) {
            case TOKEN:
                HttpEntity<Token> entityToken = new HttpEntity<>(new Token((String) message), headers);
                ResponseEntity<TokenResponse> responseToken = rest.postForEntity(url, entityToken, TokenResponse.class);
                if (responseToken.getStatusCode().value() == 400) throw new UnauthorisedException();
                return responseToken.getBody().id();
            case EVENT:
                url += message;
                ResponseEntity<Object> responseObject = rest.getForEntity(url, Object.class);
                if (responseObject.getStatusCode().value() == 404) throw new EventNotFoundException();
                return null;
        }

        return null;
    }
}

record Token(String token) {}
record TokenResponse(String id, String token, long expiry) {};
