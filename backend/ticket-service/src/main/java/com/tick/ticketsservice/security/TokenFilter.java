package com.tick.ticketsservice.security;

import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.context.*;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.Authentication;

import jakarta.servlet.http.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import java.io.IOException;

@Component
class TokenFilter extends OncePerRequestFilter {
    private TokenAuthProvider provider;

    @Autowired
    public TokenFilter(TokenAuthProvider provider) {
        this.provider = provider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        String token = request.getHeader("authorization");
        Authentication auth = new TokenAuthentication(token);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(provider.authenticate(auth));
        SecurityContextHolder.setContext(context);
        chain.doFilter(request, response);
    }
}

