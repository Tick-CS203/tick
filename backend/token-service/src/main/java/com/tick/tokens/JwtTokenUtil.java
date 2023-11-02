package com.tick.tokens;

import com.tick.entity.*;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;
import java.util.function.Function;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {
    private static Map<String, Long> expiry_map;
    private static Map<String, Algorithm> key_map = new HashMap<>();

    @Autowired
    public JwtTokenUtil(@Value("${jwt.key}") String key,
            @Value("${jwt.keyURL}") String keyURL,
            @Value("#{${jwt.expiry.map}}") Map<String, Long> expiry_map) throws Exception {
            this.expiry_map = expiry_map;
            try {
                key_map.put("access", Algorithm.RSA256(new KeyProvider(keyURL)));
                key_map.put("purchasing", Algorithm.HMAC256(key));
            } catch (Exception e) {
                e.printStackTrace();
            }
    }

    public static Token generate_tok(String username, String type)
            throws RuntimeException {
            if (type.equals("access")) throw new RuntimeException(
                    "Unable to generate access tokens from this endpoint");
            long expiry = get_expiry(type);
            Date now = new Date();
            Date expiresAt = new Date(now.getTime() + expiry);
            String token = JWT.create()
                .withIssuedAt(now)
                .withSubject(username)
                .withClaim("token_use", type)
                .withExpiresAt(expiresAt)
                .sign(key_map.get(type));
            return new Token(token, expiry);
    }

    public static User validate_tok(String token, String type)
            throws RuntimeException {
            get_expiry(type);

            Map<String, Claim> claims = get_claims(token, type);
            if (!type.equals(claims.get("token_use").asString())) {
                throw new RuntimeException("Wrong type of token supplied");
            }

            String subject = claims.get("sub").asString();
            long expiry = claims.get("exp").asLong();

            return new User(subject, expiry);
    }

    private static Map<String, Claim> get_claims(String token, String type) {
        try {
            Algorithm algo = key_map.get(type);
            if (algo == null) throw new RuntimeException("Invalid token type in query");
            return JWT.require(algo)
                .withClaimPresence("token_use")
                .withClaimPresence("sub")
                .build().verify(token)
                .getClaims();
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("This token is invalid");
        }
    }

    private static long get_expiry(String type) throws RuntimeException {
        Long expiry = expiry_map.get(type);

        if (expiry == null) throw new RuntimeException("Invalid token type in query");
        return expiry * 60 * 1000;
    }
}
