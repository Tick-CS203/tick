package com.tick.ticketsservice.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;

public class TokenAuthentication implements Authentication {
    private boolean authenticated;
    private String principal;
    private String name;
    private Collection<GrantedAuthority> authorities;

    public TokenAuthentication(String name) {
        this.name = name;
        authorities = new ArrayList<>();
    }

    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void addAuthorities(String authority) {
        authorities.add(new SimpleGrantedAuthority(authority));
    }

    public Object getCredentials() {return null;}
    public Object getDetails() {return null;}
    public Object getPrincipal() {return principal;}
    public void setPrincipal(String principal) {this.principal = principal;}
    public String getName() {return name;}
    public boolean isAuthenticated() {return authenticated;}
    public void setAuthenticated(boolean bool) {authenticated = bool;}
}
