package com.tick.tokens;

import com.tick.entity.*;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.ExpiredJwtException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
    private static String secret;
    private static Map<String, Long> expiry_map;

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secret,
            @Value("#{${jwt.expiry.map}}") Map<String, Long> expiry_map) {
            this.secret = secret;
            this.expiry_map = expiry_map;
    }

    public static Token generate_tok(String username, String type)
            throws RuntimeException {
            long expiry = get_expiry(type);
            Date now = new Date();
            JwtBuilder jwt = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .claim("type", type);


            now.setTime(now.getTime() + expiry);
            String token = jwt.setExpiration(now)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

            return new Token(token);
    }

    public static User validate_tok(String token, String type)
            throws RuntimeException {
            get_expiry(type);

            Claims claims = get_claims(token);
            if (!type.equals(claims.get("type", String.class))) {
                throw new RuntimeException("Wrong type of token supplied");
            }

            String subject = claims.getSubject();
            token = generate_tok(subject, type).token();
            long expiry = claims.getExpiration().getTime();

            return new User(subject, token, expiry);
    }

    private static Claims get_claims(String token) {
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();
    }

    private static long get_expiry(String type) throws RuntimeException {
        Long expiry = expiry_map.get(type);

        if (expiry == null) throw new RuntimeException("Invalid token type in query");
        return expiry * 60 * 1000;
    }
}
