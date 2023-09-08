package com.tick.sessionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@RestController
@RequestMapping("/session")
public class SessionServiceApplication {
    @Bean
   	public WebClient getWebClientBuilder() {
		return WebClient.builder().baseUrl("http://localhost:8083").build();
   	}

	public static void main(String[] args) {
		SpringApplication.run(SessionServiceApplication.class, args);
	}

}
