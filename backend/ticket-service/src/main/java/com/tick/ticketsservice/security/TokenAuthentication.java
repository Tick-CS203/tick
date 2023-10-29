package com.tick.ticketsservice.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class TokenAuthentication implements Authentication {
    private boolean authenticated;
    private String principal;
    private String name;
    private TokenType details;

    public TokenAuthentication(String name, TokenType details) {
        this(name);
        this.details = details;
    }

    public TokenAuthentication(String name) {
        this.name = name;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {return null;}
    public Object getCredentials() {return null;}
    public Object getDetails() {return details;}
    public Object getPrincipal() {return principal;}
    public void setPrincipal(String principal) {this.principal = principal;}
    public String getName() {return name;}
    public boolean isAuthenticated() {return authenticated;}
    public void setAuthenticated(boolean bool) {authenticated = bool;}
}
