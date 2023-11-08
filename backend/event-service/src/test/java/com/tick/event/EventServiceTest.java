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
import static org.mockito.ArgumentMatchers.any;

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
    
    
    @Test
    void updateEvent_ValidEventID_Success() {
        Event oldEvent = new Event();
        oldEvent.setEventID("old_event_id");
        oldEvent.setName("old_event_name");

        Event newEvent = new Event();
        newEvent.setEventID("old_event_id");
        newEvent.setName("new_event_name");
    
        when(eventRepository.findById(oldEvent.getEventID())).thenReturn(Optional.of(oldEvent));
        when(eventRepository.save(any(Event.class))).thenReturn(newEvent);

        eventService.updateEvent(newEvent);
    
        verify(eventRepository).findById(oldEvent.getEventID());
        verify(eventRepository).save(any(Event.class));
    }
}