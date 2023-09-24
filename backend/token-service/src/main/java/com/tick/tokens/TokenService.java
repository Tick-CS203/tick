package com.tick.tokens;

import com.tick.entity.*;
import java.util.function.BiFunction;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;

public class TokenService {
    public ResponseEntity<?> perform(String input, String token_type,
            Class<?> class_type, BiFunction<String, String, Object> func) {
        Object obj;
        int status = 400;
        Class<?> return_class = ErrorMessage.class;

        try {
            obj = func.apply(input, token_type);
            status = 200;
            return_class = class_type;
        } catch (ExpiredJwtException e) {
            obj = "The token has expired";
        } catch (RuntimeException e) {
            obj = e.getMessage();
        }

        if (obj instanceof String) {
            obj = new ErrorMessage((String) obj);
        }

        try {
            return ResponseEntity.status(status)
                .body(return_class.cast(obj));
        } catch (Exception e) {
            System.out.println("Exception met: " + e.getMessage());
            return null;
        }
    }
}
