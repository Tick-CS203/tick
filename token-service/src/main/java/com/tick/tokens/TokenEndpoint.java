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

record Error(String error) {}
record Token(String token) {}

@RestController
public class TokenEndpoint {
    @PostMapping("/token")
    public ResponseEntity<?> create_token(@RequestBody String jsonstr) throws IOException {
        Token tok = new ObjectMapper().readValue(jsonstr, Token.class);
        String tokenstr = tok.token();

        if (tokenstr.equals("")) return ResponseEntity.status(400).body(
                new Error("No token supplied"));

        return ResponseEntity.status(200).body(JwtTokenUtil.validate_tok(tokenstr));
    }

    @GetMapping("/token")
    public ResponseEntity<?> validate_token(@RequestParam(name = "User") String jsonstr) throws IOException {
        return ResponseEntity.status(200).body(new Token(JwtTokenUtil.generate_tok(jsonstr)));
    }
}
