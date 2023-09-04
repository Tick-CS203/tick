package com.tick.sessionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping("/session")
public class SessionServiceApplication {

    @PostMapping
    public void Dequeue() {
        System.out.println("queue moved");
    }

	public static void main(String[] args) {
		SpringApplication.run(SessionServiceApplication.class, args);
	}

}
