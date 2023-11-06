package com.tick.ticketsservice;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.repository.TicketRepository;
import com.tick.ticketsservice.service.TicketService;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    @Test
    void updateTicket_InvalidTicketID_ThrowException() {
        Ticket ticket = new Ticket();

        when(ticketRepository.findByKey(ticket.getKey())).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            ticketService.updateTicket(ticket);
        }, "Event not found");

        verify(ticketRepository).findByKey(ticket.getKey());
    }

    @Test
    void deleteTicket_InvalidTicketID_ThrowException() {
        Ticket ticket = new Ticket();

        when(ticketRepository.findByKey(ticket.getKey())).thenReturn(Optional.empty());
        
        assertThrows(Exception.class, () -> {
            ticketService.deleteTicketByTicketId(ticket.getKey());
        });

        verify(ticketRepository).findByKey(ticket.getKey());
    }
}
