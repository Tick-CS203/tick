package com.tick.ticketsservice.container;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;
import org.testcontainers.utility.MountableFile;

/*
 * Create and initialise MongoDB Container 
 * To set up, fill in application.properties as follows:
 * spring.data.mongodb.host=localhost
 * spring.data.mongodb.database=ticket
 * EVENT_HOST=xx
 * TICKET_HOST=xx
 * recaptcha.secret=xx
 */
@Testcontainers
public class MongoDBContainer {

    @Container
    public static final GenericContainer<?> MONGO_DB_CONTAINER = new GenericContainer<>(
            DockerImageName.parse("mongo:latest"))
            .withExposedPorts(27017)

            /*  Copies an initialization file called init-schema.js into the container. This file contains a script for database initialization. */
            .withCopyFileToContainer(MountableFile.forClasspathResource("./init-schema.js"),"/docker-entrypoint-initdb.d/init-schema.js");
    static {
        MONGO_DB_CONTAINER.start();
    }
    
    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.host", MONGO_DB_CONTAINER::getHost);
        registry.add("spring.data.mongodb.port", MONGO_DB_CONTAINER::getFirstMappedPort);
        registry.add("spring.data.mongodb.username", () -> "test_container");
        registry.add("spring.data.mongodb.password", () -> "test_container");
        registry.add("spring.data.mongodb.database", () -> "ticket_database");
    }
}
