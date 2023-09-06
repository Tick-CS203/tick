package com.tick.tokens;

import java.io.IOException;

import com.tick.entity.*;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/token")
public class TokenEndpoint {
    TokenController ctl = new TokenController();

    @PostMapping("/{type}")
    public ResponseEntity<?> validate_token(
            @RequestBody @Valid Token token,
            @PathVariable String type) throws IOException
    {
        return ctl.perform(token.token(), type, User.class, JwtTokenUtil::validate_tok);
    }

    @GetMapping("/{type}")
    public ResponseEntity<?> create_token(
            @RequestParam(name = "user") String user,
            @PathVariable String type) throws IOException
    {
        return ctl.perform(user, type, Token.class, JwtTokenUtil::generate_tok);
    }
}
