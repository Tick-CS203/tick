package com.tick.ticketservice.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class RecaptchaObject {

    @JsonProperty("secret")
    private static String secret;

    @Autowired
    public RecaptchaObject(@Value("${recaptcha.secret}") String secret) {
        this.secret = secret;
    }

    public static String getSecret() {
        return secret;
    }
}
