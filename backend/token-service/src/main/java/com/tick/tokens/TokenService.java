package com.tick.tokens;

import com.tick.entity.*;
import java.util.function.BiFunction;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TokenService {
    public ResponseEntity<?> perform(String input, String token_type,
            BiFunction<String, String, Object> func) {
        Object obj;
        int status = 400;

        try {
            obj = func.apply(input, token_type);
            status = 200;
        } catch (RuntimeException e) {
            obj = new ErrorMessage(e.getMessage());
        }

        try {
            return ResponseEntity.status(status).body(obj);
        } catch (Exception e) {
            System.out.println("Exception met: " + e.getMessage());
            return null;
        }
    }
}
