package com.tick.tokens;

import java.util.Date;
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
    private static long inter_expiry;
    private static long purchase_expiry;
    private static String secret;

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secret,
            @Value("${jwt.expiry.intermediate}") String inter_expiry,
            @Value("${jwt.expiry.purchasing}") String purchase_expiry) {
            this.secret = secret;
            this.inter_expiry = Long.parseLong(inter_expiry) * 60 * 1000;
            this.purchase_expiry = Long.parseLong(purchase_expiry) * 60 * 1000;
    }

    public static String generate_tok(String username, String type)
            throws RuntimeException {
            Date now = new Date();
            JwtBuilder jwt = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .claim("type", type);

            long expiry = get_expiry(type);

            if (expiry != 0) {
                now.setTime(now.getTime() + expiry);
                jwt.setExpiration(now);
            }

            return jwt.signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public static String validate_tok(String token, String type)
            throws RuntimeException {
            Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

            if (claims.get("type", String.class) != type) {
                throw new RuntimeException("Wrong type of token supplied");
            }

            return claims.getSubject();
    }

    public static long get_expiry(String type) throws RuntimeException {
        if ("intermediate".equals(type)) return inter_expiry;
        if ("purchasing".equals(type)) return purchase_expiry;
        if ("access".equals(type)) return 0;
        throw new RuntimeException("Invalid type");
    }
}
