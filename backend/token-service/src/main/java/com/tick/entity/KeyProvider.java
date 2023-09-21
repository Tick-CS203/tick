package com.tick.entity;

import java.util.List;
import java.util.Base64;
import java.io.InputStream;
import java.math.BigInteger;
import java.net.URL;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.RSAPublicKeySpec;
import java.security.interfaces.RSAPublicKey;
import java.security.KeyFactory;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.RSAKeyProvider;
import com.fasterxml.jackson.databind.ObjectMapper;

public class KeyProvider implements RSAKeyProvider {
    private URL url;
    public KeyProvider(String url) {
        try {
        this.url = new URL(url);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public RSAPublicKey getPublicKeyById(String ID) {
        try {
            String content = new String(((InputStream) url.getContent()).readAllBytes());
            KeyList list = new ObjectMapper().readValue(content, KeyList.class);
            for (JWKS keySet : list.keys()) {
                if (ID.equals(keySet.kid())) {
                    BigInteger modulus = new BigInteger(1, Base64.getUrlDecoder().decode(keySet.n()));
                    BigInteger exponent = new BigInteger(1, Base64.getUrlDecoder().decode(keySet.e()));

                    RSAPublicKeySpec keySpec = new RSAPublicKeySpec(modulus, exponent);
                    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
                    return (RSAPublicKey) keyFactory.generatePublic(keySpec);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public RSAPrivateKey getPrivateKey() {
        return null;
    }

    public String getPrivateKeyId() {
        return null;
    }
}

record JWKS (String alg, String e, String kid, String kty, String n, String use) {}

record KeyList (List<JWKS> keys) {}
