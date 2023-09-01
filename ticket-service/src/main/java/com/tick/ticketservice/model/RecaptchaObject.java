package com.tick.ticketservice.model;

public class RecaptchaObject {
    private String secret;
    private final String response = "";

    public RecaptchaObject(String secret) {
        this.secret = secret;
    }
}
