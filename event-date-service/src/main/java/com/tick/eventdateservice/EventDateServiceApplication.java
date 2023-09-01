package com.tick.eventdateservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class EventDateServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventDateServiceApplication.class, args);
	}

   	@Bean
   	public WebClient.Builder getWebClientBuilder() {
		return WebClient.builder().baseURL("http://localhost:8080").build();
   	}
}
