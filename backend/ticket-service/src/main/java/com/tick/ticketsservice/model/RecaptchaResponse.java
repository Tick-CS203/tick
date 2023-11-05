package com.tick.ticketsservice.model;

import lombok.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@Data
public class RecaptchaResponse {
    private String success;
    private String challenge_ts;
    @JsonProperty("error-codes")
    private List<String> error;
}
