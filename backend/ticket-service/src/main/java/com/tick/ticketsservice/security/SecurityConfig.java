package com.tick.ticketsservice.security;

import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.*;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.beans.factory.annotation.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private TokenFilter filter;

    @Autowired
    public SecurityConfig(TokenFilter filter) {
        this.filter = filter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.addFilterBefore(filter, BasicAuthenticationFilter.class).authorizeHttpRequests(
                        registry -> {
                            registry.requestMatchers((HttpMethod) null, "/tickets/user").hasAuthority("access")
                                    .requestMatchers(HttpMethod.POST, "/tickets/allocate/**").hasAuthority("purchasing")
                                    .requestMatchers((HttpMethod) null, "/tickets").permitAll()
                                    .requestMatchers(HttpMethod.GET, "/tickets/ticket").permitAll()
                                    .requestMatchers(HttpMethod.GET, "/tickets/event/*").permitAll()
                                    .requestMatchers(HttpMethod.POST, "/tickets/recaptcha").permitAll()
                                    .requestMatchers(HttpMethod.GET).permitAll();
                        })
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(CorsFilter.config()));
        return http.build();
    }
}
