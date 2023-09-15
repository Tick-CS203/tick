package com.tick.tokens;

import java.io.IOException;

import com.tick.entity.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
public class TokenController {
    TokenService svc = new TokenService();

    @GetMapping
    public String health_check() {
        return "Service is up";
    }

    @PostMapping("/{type}")
    public ResponseEntity<?> validate_token(
            @RequestBody Token token,
            @PathVariable String type) throws IOException
    {
        return svc.perform(token.token(), type, User.class, JwtTokenUtil::validate_tok);
    }

    @GetMapping("/{type}")
    public ResponseEntity<?> create_token(
            @RequestParam(name = "user") String user,
            @PathVariable String type) throws IOException
    {
        return svc.perform(user, type, Token.class, JwtTokenUtil::generate_tok);
    }
}
