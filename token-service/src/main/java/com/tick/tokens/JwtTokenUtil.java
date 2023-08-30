package com.tick.tokens;

import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
    private static int inter_token_exp = 10 * 60 * 1000; //10 minutes
    private static String secret;

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }

    public static String generate_tok(String username, boolean inter) {
        Date now = new Date();
        JwtBuilder jwt = Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now);

        if (inter) {
            now.setTime(now.getTime() + inter_token_exp);
            jwt.setExpiration(now);
        }

        return jwt.signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }

    public static String validate_tok(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
        if (claims.getExpiration().before(new Date())) {
            return null;
        }

        return claims.getSubject();
    }
}
