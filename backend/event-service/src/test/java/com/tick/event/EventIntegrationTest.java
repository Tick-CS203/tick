package com.tick.event;

import java.net.URI;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.tick.event.container.MongoDBContainer;
import com.tick.model.Event;

/**
 * Run disposable database in Docker container
 * Ensure that Docker Desktop is running
 */
@Testcontainers
/** Start an actual HTTP server listening at a random port*/
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
/** Create only one instance of the test class and reuse it between tests */
public class EventIntegrationTest extends MongoDBContainer {

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
    
    @Test
    public void getEvents_Success() throws Exception {
        URI uri = new URI(baseUrl + port + "/event");
        ResponseEntity<Event[]> result = restTemplate.getForEntity(uri, Event[].class);
        Event[] events = result.getBody();
    
        assertEquals(200, result.getStatusCode().value());
        assertTrue(events.length > 0);
    }
    
    @Test
    public void getEventByID_InvalidEventID_Failure() throws Exception {
        URI uri = new URI(baseUrl + port + "/event/invalid_event");
        ResponseEntity<Event> result = restTemplate.getForEntity(uri, Event.class);
        assertEquals(404, result.getStatusCode().value());
    }
    
    @Test
    public void deleteEvent_InvalidEventID_Failure() throws Exception {
        URI uri = new URI(baseUrl + port + "/event/invalid_event");
        ResponseEntity<Void> result = restTemplate.exchange(uri, HttpMethod.DELETE, null, Void.class);
        assertEquals(404, result.getStatusCode().value());
    }

    /* 
    
    @Test
    public void upsertEvent_Success() throws Exception {
        Event newEvent = new Event();
        newEvent.setEventID("1");
        newEvent.setName("updated_name_1");

        URI uri = new URI(baseUrl + port + "/event/" + newEvent.getEventID());
        ResponseEntity<Event> result = restTemplate.exchange(uri, HttpMethod.PATCH, new HttpEntity<>(newEvent), Event.class);

        assertEquals(201, result.getStatusCode().value());
        assertEquals(newEvent.getName(), result.getBody().getName());
    }
    
    @Test
    public void addEvent_ValidVenueID_Success() throws Exception {
        Event event = new Event();
        event.setEventID("test_event_id");
        event.setName("test_event_name");
        event.setVenueID("national_stadium");
        event.setDate(new ArrayList<>());
    
        URI uri = new URI(baseUrl + port + "/event");
        ResponseEntity<Event> result = restTemplate.postForEntity(uri, event, Event.class);
    
        assertEquals(201, result.getStatusCode().value());
        assertEquals(event.getName(), result.getBody().getName());
    }
    
    @Test
    public void getEventByID_ValidEventID_Success() throws Exception {
        URI uri = new URI(baseUrl + port + "/event/1");
        ResponseEntity<Event> result = restTemplate.getForEntity(uri, Event.class);
    
        assertEquals(200, result.getStatusCode().value());
        assertEquals("1", result.getBody().getName());
    }    
    
    @Test
    public void deleteEvent_ValidEventID_Success() throws Exception {
        Event event = new Event();
        String eventID = eventRepository.save(event).getEventID();
    
        URI uri = new URI(baseUrl + port + "/event/" + eventID);
    
        ResponseEntity<Void> result = restTemplate.exchange(uri, HttpMethod.DELETE, null, Void.class);
        assertEquals(200, result.getStatusCode().value());
    }
    
    @Test
    public void updateEvent_ValidEventID_Success() throws Exception {
        Event event = new Event();
        String eventID = eventRepository.save(event).getEventID();
        Event newEvent = new Event();
    
        URI uri = new URI(baseUrl + port + "/event/" + eventID);
        ResponseEntity<Event> result = restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(newEvent),
                Event.class);
    
        assertEquals(200, result.getStatusCode().value());
        assertEquals(newEvent.getName(), result.getBody().getName());
    }
    
    */
}
