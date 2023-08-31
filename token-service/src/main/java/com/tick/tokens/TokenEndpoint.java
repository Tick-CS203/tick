package com.tick.tokens;

import java.io.IOException;

import org.springframework.web.bind.annotation.*;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;

record Error(String error) {}
record Token(String token) {}
record User(String id) {}

@RestController
public class TokenEndpoint {
    @PostMapping("/token/{type}")
    public ResponseEntity<?> validate_token(
            @RequestBody String jsonstr,
            @PathVariable String type
            ) throws IOException {
        Token tok = new ObjectMapper().readValue(jsonstr, Token.class);
        String tokenstr = tok.token();

        if (tokenstr.equals("")) return ResponseEntity.status(400).body(
                new Error("No token supplied"));

        String user;
        try {
            user = JwtTokenUtil.validate_tok(tokenstr, type);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(400).body(new Error("The token has expired"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(new Error(e.getMessage()));
        }

        return ResponseEntity.status(200).body(new User(user));
    }

    @GetMapping("/token/{type}")
    public ResponseEntity<?> create_token(
            @RequestParam(name = "User") String user,
            @PathVariable String type
            ) throws IOException {
        String token;
        try {
            token = JwtTokenUtil.generate_tok(user, type);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(
                    new Error(e.getMessage()));
        }
        return ResponseEntity.status(200).body(
                new Token(token));
            }
}
