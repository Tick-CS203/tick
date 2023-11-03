package com.tick.ticketsservice.container;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers
public class MongoDBContainer {

    @Container
    public static final GenericContainer<?> MONGO_DB_CONTAINER = new GenericContainer<>(
            DockerImageName.parse("mongo:latest"))
            .withExposedPorts(27017);
    static {
        MONGO_DB_CONTAINER.start();
    }
    
    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.host", MONGO_DB_CONTAINER::getHost);
        registry.add("spring.data.mongodb.port", MONGO_DB_CONTAINER::getFirstMappedPort);
        registry.add("spring.data.mongodb.username", () -> "test_container");
        registry.add("spring.data.mongodb.password", () -> "test_container");
        registry.add("spring.data.mongodb.database", () -> "user_management");
    }
}
