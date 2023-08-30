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
record User(int id) {}

@RestController
public class TokenEndpoint {
    @PostMapping("/token")
    public ResponseEntity<?> validate_token(
            @RequestBody String jsonstr
            ) throws IOException {
        Token tok = new ObjectMapper().readValue(jsonstr, Token.class);
        String tokenstr = tok.token();

        if (tokenstr.equals("")) return ResponseEntity.status(400).body(
                new Error("No token supplied"));

        return ResponseEntity.status(200).body(JwtTokenUtil.validate_tok(tokenstr));
    }

    @GetMapping("/token")
    public ResponseEntity<?> create_token(
            @RequestParam(name = "User") String jsonstr
            ) throws IOException {
        return ResponseEntity.status(200).body(
                new Token(JwtTokenUtil.generate_tok(jsonstr, false)));
    }

    @PostMapping("/inter_token")
    public ResponseEntity<?> validate_inter_token(
            @RequestBody String jsonstr
            ) throws IOException {
        Token tok = new ObjectMapper().readValue(jsonstr, Token.class);
        String tokenstr = tok.token();

        if (tokenstr.equals("")) return ResponseEntity.status(400).body(
                new Error("No token supplied"));

        String user = JwtTokenUtil.validate_tok(tokenstr);
        if (user == null)
            return ResponseEntity.status(400).body(new Error("The token has expired"));
        return ResponseEntity.status(200).body(JwtTokenUtil.validate_tok(tokenstr));
    }

    @GetMapping("/inter_token")
    public ResponseEntity<?> create_inter_token(
            @RequestParam(name = "User") String jsonstr
            ) throws IOException {
        return ResponseEntity.status(200).body(
                new Token(JwtTokenUtil.generate_tok(jsonstr, true)));
    }
}
