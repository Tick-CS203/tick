package com.tick.ticketservice.model;

public class RecaptchaObject {
    private String secret;
    private final String response = "6Lc-W-4nAAAAAIr0NNe5umQXXf_7RWeakqN1GpvH";

    public RecaptchaObject(String secret) {
        this.secret = secret;
    }
}
