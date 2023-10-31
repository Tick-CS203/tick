package com.tick.ticketsservice.security;

import com.tick.ticketsservice.model.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Component
class TokenAuthProvider implements AuthenticationProvider {
    private String host;

    @Autowired
    public TokenAuthProvider(@Value("${TOKEN_HOST}") String host) {
        this.host = host;
    }

    public Authentication authenticate(Authentication auth) {
        TokenAuthentication tokenAuth = (TokenAuthentication) auth;
        tokenAuth.setAuthenticated(false);

        String[] arr = new String[] { "access", "purchasing" };
        for (String url : arr) {
            try {
                TokenResponse user = webRequest(tokenAuth, url);
                tokenAuth.setAuthenticated(true);
                tokenAuth.setPrincipal(user.id());
                tokenAuth.addAuthorities(url);
            } catch (Exception e) {
                System.out.println("Token authentication failed: " + url);
            }
        }
        return tokenAuth;
    }

    public boolean supports(Class<?> authtype) {
        return authtype.equals(TokenAuthentication.class);
    }

    public TokenResponse webRequest(TokenAuthentication tokenAuth, String url) {
        return WebClient.create("http://" + host + ":8080/token/" + url).post()
                .body(Mono.just(new Token(tokenAuth.getName())), Token.class)
                .exchangeToMono(response -> {
                    if (response.statusCode().value() == 400)
                        return response.createError();
                    return response.bodyToMono(TokenResponse.class);
                }).block();
    }
}
