package com.tick.ticketsservice;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.container.MongoDBContainer;
import com.tick.ticketsservice.repository.TicketRepository;

/**
 * Run disposable database in Docker container
 * Ensure that Docker Desktop is running
 */
@Testcontainers
/** Start an actual HTTP server listening at a random port*/
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
/** Create only one instance of the test class and reuse it between tests */
@TestInstance(Lifecycle.PER_CLASS)
public class TicketIntegrationTest extends MongoDBContainer {

    @LocalServerPort
	private int port = 27017;

    private final String baseUrl = "http://localhost:";

    /**
	 * Use TestRestTemplate for testing a real instance of your application as an external actor.
	 * TestRestTemplate is just a convenient subclass of RestTemplate that is suitable for integration tests.
 	 * It is fault tolerant, and optionally can carry Basic authentication headers.
	 */
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TicketRepository ticketRepository;

    @AfterAll
    void tearDown() {
        ticketRepository.deleteAll();
    }

    @Test
    public void addTicket_Success() throws Exception {
        Ticket ticket = new Ticket(new CompositeKey("eventID1", "2023-09-22T14:41:23.497+00:00",
                "611", "A", 5), "asfas", "CAT5", "orderID1", "2023-09-02T14:41:23.497+00:00\"");

        URI uri = new URI(baseUrl + port + "/tickets");
        ResponseEntity<Ticket> result = restTemplate.postForEntity(uri, ticket, Ticket.class);

        assertEquals(201, result.getStatusCode().value());
        assertEquals(ticket.getCategory(), result.getBody().getCategory());
        assertEquals(ticket.getUser(), result.getBody().getUser());
        assertEquals(ticket.getKey().getEventDate(), result.getBody().getKey().getEventDate());
        assertEquals(ticket.getKey().getSection(), result.getBody().getKey().getSection());
        assertEquals(ticket.getKey().getRow(), result.getBody().getKey().getRow());
        assertEquals(ticket.getKey().getSeatNumber(), result.getBody().getKey().getSeatNumber());
    }
    
    // TicketIntegrationTest.updateTicket_InvalidTicketID_Failure:81 expected: <404> but was: <500>
    @Test
    public void updateTicket_InvalidTicketID_Failure() throws Exception {
        Ticket ticket = new Ticket(new CompositeKey("eventID1", "2023-09-22T14:41:23.497+00:00",
                "611", "A", 5), "asfas", "CAT5", "orderID1", "2023-09-02T14:41:23.497+00:00\"");

        URI uri = new URI(baseUrl + port + "/tickets");

        ResponseEntity<Ticket> result = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(ticket),
                Ticket.class);
        assertEquals(404, result.getStatusCode().value());
    }
    
    @Test
    public void updateTicket_ValidTicketID_Success() throws Exception {
        CompositeKey key = new CompositeKey("eventID1", "2023-09-22T14:41:23.497+00:00",
                "611", "A", 5);

        Ticket ticket = new Ticket(key, "asfas", "CAT5", "orderID1", "2023-09-02T14:41:23.497+00:00\"");
        Ticket newTicket = new Ticket(key, "asfas2", "CAT5", "orderID1", "2023-09-02T14:41:23.497+00:00\"");

        ticketRepository.save(ticket);

        URI uri = new URI(baseUrl + port + "/tickets");
        ResponseEntity<Ticket> result = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(newTicket),
                Ticket.class);

        assertEquals(200, result.getStatusCode().value());
        assertEquals(newTicket.getCategory(), result.getBody().getCategory());
        assertEquals(newTicket.getUser(), result.getBody().getUser());
        assertEquals(newTicket.getKey().getEventDate(), result.getBody().getKey().getEventDate());
        assertEquals(newTicket.getKey().getSection(), result.getBody().getKey().getSection());
        assertEquals(newTicket.getKey().getRow(), result.getBody().getKey().getRow());
        assertEquals(newTicket.getKey().getSeatNumber(), result.getBody().getKey().getSeatNumber());
    }
    
    // TicketIntegrationTest.deleteTicket_ValidTicketID_Success:123 expected: <200> but was: <404>
    @Test
    public void deleteTicketByTicketID_ValidTicketID_Success() throws Exception {
        Ticket ticket = new Ticket(new CompositeKey("eventID1", "2023-09-22T14:41:23.497+00:00",
                "611", "A", 5), "asfas", "CAT5", "orderID1", "2023-09-02T14:41:23.497+00:00\"");
        ticketRepository.save(ticket);

        String uri = UriComponentsBuilder.fromUriString(baseUrl + port)
            .path("/tickets/")
            .queryParam("event", ticket.getKey().getEventID())
            .queryParam("eventDate", ticket.getKey().getEventDate())
            .queryParam("section", ticket.getKey().getSection())
            .queryParam("row", ticket.getKey().getRow())
            .queryParam("seatNumber", ticket.getKey().getSeatNumber())
            .toUriString();

        ResponseEntity<Void> result = restTemplate.exchange(uri, HttpMethod.DELETE, null, Void.class);
        assertEquals(200, result.getStatusCode().value());
    }

    @Test
    public void deleteTicketByTicketID_InvalidTicketID_Failure() throws Exception {
        Ticket ticket = new Ticket(new CompositeKey("eventID1", "2023-09-22T14:41:23.497+00:00",
                "611", "A", 5), "asfas", "CAT5", "orderID1", "2023-09-02T14:41:23.497+00:00\"");

        String uri = UriComponentsBuilder.fromUriString(baseUrl + port)
            .path("/tickets/")
            .queryParam("event", ticket.getKey().getEventID())
            .queryParam("eventDate", ticket.getKey().getEventDate())
            .queryParam("section", ticket.getKey().getSection())
            .queryParam("row", ticket.getKey().getRow())
            .queryParam("seatNumber", ticket.getKey().getSeatNumber())
            .toUriString();
            
        ResponseEntity<Void> result = restTemplate.exchange(uri, HttpMethod.DELETE, null, Void.class);
        assertEquals(404, result.getStatusCode().value());
    }
}
