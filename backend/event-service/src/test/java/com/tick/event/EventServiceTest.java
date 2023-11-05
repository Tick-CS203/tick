package com.tick.event;

import java.util.HashMap;
import java.util.Optional;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.springframework.web.server.ResponseStatusException;

import com.tick.model.Event;
import com.tick.repository.EventRepository;
import com.tick.service.EventService;
import com.tick.service.VenueRequest;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private VenueRequest venueRequest;

    @InjectMocks
    private EventService eventService;

    @Test
    void addEvent_ValidVenueID_Success() {
        Event event = new Event("test event", null, null, null, null, null,
                5, "64ecb4ad17d89d593f3c5f2f", null, null, null);

        when(venueRequest.getSeatMap(event.getVenueID())).thenReturn(new HashMap<>());
        when(eventRepository.save(event)).thenReturn(event);

        Event result = eventService.addEvent(event);

        assertEquals(event.getName(), result.getName());
        verify(eventRepository).save(event);
        verify(venueRequest).getSeatMap(event.getVenueID());
    }
    
    // Wanted but not invoked: venueRequest.getSeatMap("invalidVenueID");
    @Test
    void addEvent_InvalidVenueID_ThrowException() {
        Event event = new Event("test event", null, null, null, null, null,
                5, "invalidVenueID", null, null, null);

        when(venueRequest.getSeatMap(event.getVenueID())).thenThrow(ResponseStatusException.class);

        assertThrows(ResponseStatusException.class, () -> {
            eventService.updateEvent(event);
        });

        verify(venueRequest).getSeatMap(event.getVenueID());
    }

    // EventServiceTest.updateEvent_ValidEventID_Success:72 » ResponseStatus 404 NOT_FOUND "Event not found"
    @Test
    void updateEvent_ValidEventID_Success() {
        Event event = new Event("test event", null, null, null, null, null,
                5, null, null, null, null);
        event.setEventID("100");

        when(eventRepository.findById(event.getEventID())).thenReturn(Optional.of(event));

        eventService.updateEvent(event);

        verify(eventRepository).findById(event.getEventID());
    }

    @Test
    void updateEvent_InvalidEventID_ThrowException() {
        Event event = new Event("test event", null, null, null, null, null,
                5, null, null, null, null);
        event.setEventID("100");

        when(eventRepository.findById(event.getEventID())).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            eventService.updateEvent(event);
        }, "Event not found");

        verify(eventRepository).findById(event.getEventID());
    }

    @Test
    void deleteEvent_InvalidEventID_ThrowException() {
        String eventID = "10";

        when(eventRepository.findById(eventID)).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> {
            eventService.deleteEvent(eventID);
        });

        verify(eventRepository).findById(eventID);
    }
}