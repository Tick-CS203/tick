package com.tick.bookmarks.security;

import com.tick.bookmarks.entity.*;

import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.*;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.annotation.web.configurers.*;
import org.springframework.security.config.Customizer;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import jakarta.servlet.http.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import reactor.core.publisher.Mono;

import java.util.Collection;
import java.io.IOException;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private CustomFilter filter;

    @Autowired
    public SecurityConfig(CustomFilter filter) {
        this.filter = filter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.addFilterBefore(filter, BasicAuthenticationFilter.class).authorizeHttpRequests(
                registry -> {
                    registry.requestMatchers((HttpMethod) null, "/bookmarks/*").authenticated()
                        .requestMatchers(HttpMethod.GET, "/bookmarks").permitAll()
                        .requestMatchers(HttpMethod.GET).permitAll();
                })
        .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults());
        return http.build();
    }
}

@Component
class CustomFilter extends OncePerRequestFilter {
    private authProvider provider;

    @Autowired
    public CustomFilter(authProvider provider) {
        this.provider = provider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        String token = request.getHeader("authorization");
        Authentication auth = new CustomAuthentication(token);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(provider.authenticate(auth));
        SecurityContextHolder.setContext(context);
        chain.doFilter(request, response);
    }
}

@Component
class authProvider implements AuthenticationProvider {
    private String host;

    @Autowired
    public authProvider(@Value("${TOKEN_HOST}") String host) {
        this.host = host;
    }

    public Authentication authenticate(Authentication auth) {
        CustomAuthentication customAuth = (CustomAuthentication) auth;
        try {
            TokenResponse user = WebClient.create("http://" + host + ":8080/token/access").post()
                .body(Mono.just(new Token(customAuth.getName())), Token.class)
                .exchangeToMono(response -> {
                    if (response.statusCode().value() == 400) return response.createError();
                    return response.bodyToMono(TokenResponse.class);
                }).block();
            customAuth.setAuthenticated(true);
            customAuth.setPrincipal(user.id());
        } catch (Exception e) {
            customAuth.setAuthenticated(false);
        }
        return customAuth;
    }

    public boolean supports(Class<?> authtype) {
        if (authtype.equals(CustomAuthentication.class)) return true;
        return false;
    }
}
