package com.tick.event;

import java.util.HashMap;
import java.util.ArrayList;
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
        Event event = new Event();
        event.setEventID("event_id");
        event.setVenueID("real_venue");
        event.setDate(new ArrayList<>());

        when(venueRequest.getSeatMap(event.getVenueID())).thenReturn(new HashMap<>());
        when(eventRepository.save(event)).thenReturn(event);

        Event result = eventService.addEvent(event);

        assertEquals(event.getName(), result.getName());
        verify(eventRepository).save(event);
        verify(venueRequest).getSeatMap(event.getVenueID());
    }

    @Test
    void addEvent_InvalidVenueID_ThrowException() {
        Event event = new Event();
        event.setEventID("event_id");
        event.setVenueID("fake_venue");
        event.setDate(new ArrayList<>());

        when(venueRequest.getSeatMap(event.getVenueID())).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> {
            eventService.addEvent(event);
        });

        verify(venueRequest).getSeatMap(event.getVenueID());
    }

    @Test
    void updateEvent_InvalidEventID_ThrowException() {
        Event event = new Event();
        event.setEventID("fake_event");

        when(eventRepository.findById(event.getEventID())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            eventService.updateEvent(event);
        });

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
    
    /* 
    
    @Test
    void updateEvent_ValidEventID_Success() {
        Event event = new Event("test event", null, null, null, null, null,
                5, null, null, null, null);
        event.setEventID("100");
    
        when(eventRepository.findById(event.getEventID())).thenReturn(Optional.of(event));
    
        eventService.updateEvent(event);
    
        verify(eventRepository).findById(event.getEventID());
    }
    
    */
}