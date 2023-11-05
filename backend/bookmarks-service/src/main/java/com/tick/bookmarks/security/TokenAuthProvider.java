package com.tick.bookmarks.security;

import com.tick.bookmarks.entity.*;

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
        try {
            TokenResponse user = webRequest(tokenAuth);
            tokenAuth.setAuthenticated(true);
            tokenAuth.setPrincipal(user.id());
        } catch (Exception e) {
            tokenAuth.setAuthenticated(false);
        }
        return tokenAuth;
    }

    public boolean supports(Class<?> authtype) {
        return authtype.equals(TokenAuthentication.class);
    }

    private TokenResponse webRequest(TokenAuthentication tokenAuth) {
        return WebClient.create("http://" + host + ":8080/token/access").post()
                .body(Mono.just(new Token(tokenAuth.getName())), Token.class)
                .exchangeToMono(response -> {
                    if (response.statusCode().value() == 400)
                        return response.createError();
                    return response.bodyToMono(TokenResponse.class);
                }).block();
    }
}
