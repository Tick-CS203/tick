package com.tick.ticketsservice;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.tick.ticketsservice.model.*;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.repository.TicketRepository;
import com.tick.ticketsservice.service.*;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private EventService eventService;

    @InjectMocks
    private TicketService ticketService;

    @Test
    void allocateSeats_AboveTicketQuantityLimit_ThrowException() {
        Event event = new Event();
        event.setEventID("10");
        event.setTicketLimit(2);

        List<EventDate> dates = new ArrayList<>();
        dates.add(new EventDate("eventDate1", "10", LocalDateTime.now(), new HashMap<>()));
        event.setDate(dates);

        List<SelectedRow> selectedRows = new ArrayList<>();
        selectedRows.add(new SelectedRow("CAT1", "112", "A", 5));

        // when(eventService.get(event.getEventID())).thenReturn(event);

        assertThrows(RuntimeException.class, () -> {
            ticketService.allocateSeats("10", "eventDate1", selectedRows, "user1");
        }, "Selected quantity is above purchase limit");

        // verify(eventService).get(event.getEventID());
    }

    @Test
    void allocateSeats_InvalidCategory_ThrowException() {
        Event event = new Event();
        event.setEventID("10");
        event.setTicketLimit(2);

        List<EventDate> dates = new ArrayList<>();

        Map<String, Integer> rowMap = new HashMap<>();
        rowMap.put("A", 30);
        Map<String, Map<String, Integer>> sectionMap = new HashMap<>();
        sectionMap.put("S1", rowMap);
        Map<String, Map<String, Map<String, Integer>>> categoryMap = new HashMap<>();
        categoryMap.put("C1", sectionMap);

        dates.add(new EventDate("eventDate1", "10", LocalDateTime.now(), categoryMap));
        event.setDate(dates);

        List<SelectedRow> selectedRows = new ArrayList<>();
        selectedRows.add(new SelectedRow("CAT1", "112", "A", 5));

        // when(eventService.get(event.getEventID())).thenReturn(event);

        assertThrows(RuntimeException.class, () -> {
            ticketService.allocateSeats("10", "eventDate1", selectedRows, "user1");
        }, "Invalid seat selection");
        
        // verify(eventService).get(any(String.class));
    }

    @Test
    void updateTicket_ValidTicketID_Success() {
        Ticket ticket = new Ticket();
        ticket.setKey(new CompositeKey("eventID", "eventDateID", "section", "row", 1));
        ticket.setUser("Peter Pan");

        Ticket updatedTicket = new Ticket();
        updatedTicket.setKey(new CompositeKey("eventID", "eventDateID", "section", "row", 1));
        updatedTicket.setUser("Peter Pan 2");

        when(ticketRepository.findById(ticket.getKey())).thenReturn(Optional.of(ticket));
        when(ticketRepository.save(updatedTicket)).thenReturn(updatedTicket);

        Ticket result = ticketService.updateTicket(updatedTicket);

        assertEquals(updatedTicket.getUser(), result.getUser());
        verify(ticketRepository).findById(ticket.getKey());
        verify(ticketRepository).save(updatedTicket);
    }
}
