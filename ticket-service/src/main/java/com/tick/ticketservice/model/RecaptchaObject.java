package com.tick.ticketservice.model;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class RecaptchaObject {

    @JsonProperty("secret")
    private final String secret = "";

    @JsonProperty("response")
    private String response;

    public RecaptchaObject(String response) {
        this.response = response;
    }
}
