package com.tick.ticketsservice.model;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
public class RecaptchaRequest {
    @NotNull
    private String recaptchaToken;
}
