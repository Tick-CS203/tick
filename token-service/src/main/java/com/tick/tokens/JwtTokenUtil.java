package com.tick.tokens;

import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
    private static String secret;

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }
    public static String generate_tok(String username) {
        return Jwts.builder()
           .setSubject(username)
           .signWith(SignatureAlgorithm.HS512, secret)
           .compact();
    }

    public static String validate_tok(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
        return (String) claims.getSubject();
    }
}
