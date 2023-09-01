package com.tick.tokens;

import java.util.Date;
import java.util.Map;

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

    public static String generate_tok(String username, String type)
            throws RuntimeException {
            long expiry = get_expiry(type);
            Date now = new Date();
            JwtBuilder jwt = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .claim("type", type);


            now.setTime(now.getTime() + expiry);
            jwt.setExpiration(now);

            return jwt.signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public static String validate_tok(String token, String type)
            throws RuntimeException {
            get_expiry(type);

            Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

            if (!type.equals(claims.get("type", String.class))) {
                throw new RuntimeException("Wrong type of token supplied");
            }

            return claims.getSubject();
    }

    private static long get_expiry(String type) throws RuntimeException {
        Long expiry = expiry_map.get(type);

        if (expiry == null) throw new RuntimeException("Invalid token type in query");
        return expiry * 60 * 1000;
    }
}
