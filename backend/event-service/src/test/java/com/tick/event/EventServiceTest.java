package com.tick.event;

import java.util.Optional;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.springframework.web.server.ResponseStatusException;

import com.tick.model.Event;
import com.tick.repository.EventRepository;
import com.tick.service.EventService;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventService eventService;

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