package com.tick.ticketsservice.service;

import java.util.*;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.reactive.function.client.*;

import com.tick.ticketsservice.model.*;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.repository.TicketRepository;
import com.tick.ticketsservice.exception.*;

@Service
public class TicketService {
    private TicketRepository ticketRepository;
    private EventService eventsvc;

    @Autowired
    public TicketService(TicketRepository repo,
            @Value("${EVENT_HOST}") String event_host) {
        ticketRepository = repo;
        eventsvc = new EventService(event_host);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket addTicket(Ticket ticket) {
        // check that event date ID is valid
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketByUserId(String userId) {
        return ticketRepository.findByUser(userId);
    }

    public Ticket getTicketByKey(CompositeKey key) {
        return ticketRepository.findById(key).orElse(null);
    }

    // if user transfers ticket
    public Ticket updateTicket(Ticket updatedTicket) {
        return ticketRepository.save(
                ticketRepository.findById(updatedTicket.getKey()).map(
                        ticket -> updatedTicket).orElse(null));
    }

    // if user deactivates account
    public List<Ticket> releaseTicket(String userId) {
        List<Ticket> tickets = ticketRepository.findByUser(userId);
        tickets.forEach(ticket -> ticket.setUser(null));

        return ticketRepository.saveAll(tickets);
    }

    // if event is cancelled
    public String deleteTicketByEvent(String eventId) {
        List<Ticket> tickets = ticketRepository.findAll();
        tickets.forEach(ticket -> {
            CompositeKey key = ticket.getKey();
            if (eventId.equals(key.getEventDateID()))
                ticketRepository.deleteById(key);
        });
        return "event " + eventId + "'s tickets have been deleted";
    }

    // if user transfers ticket
    // is it possible for user to get a refund?
    public String deleteTicketByTicketId(CompositeKey key) {
        ticketRepository.deleteById(key);
        return key + "ticket has been deleted";
    }

    // [{category: "CAT1", section: "PC1", row: "C", quantity: 2}, {category:
    // "CAT2", section: "140", row: "B", quantity: 1}]
    public List<Ticket> allocateSeats(String eventID, String eventDateID, List<SelectedRow> selectedRows, String user) {
        Event event = eventsvc.get(eventID);

        EventDate date = findEventDate(event, eventDateID);

        Map<String, Map<String, Map<String, Integer>>> seatAvailability = date.getSeatAvailability();
        Map<String, Map<String, Map<String, Integer>>> seatMap = event.getSeatMap();

        Integer totalQuantity = 0;
        for (SelectedRow rowObj : selectedRows) {
            totalQuantity += rowObj.getQuantity();
        }

        if (totalQuantity > event.getTicketLimit())
            throw new SeatSelectionException("Selected quantity is above purchase limit");

        List<Ticket> allocatedTickets = new ArrayList<>();

        String orderID = createOrderId();
        LocalDateTime orderDateTime = createOrderDate();

        for (SelectedRow rowObj : selectedRows) {
            String category = rowObj.getCategory();
            String section = rowObj.getSection();
            String row = rowObj.getRow();
            Integer quantity = rowObj.getQuantity();

            Map<String, Integer> sectionMap;
            int currentAvailable;
            int maxCapacity;

            try {
                sectionMap = seatAvailability.get(category).get(section);

                currentAvailable = sectionMap.get(row);
                maxCapacity = seatMap.get(category).get(section).get(row);
            } catch (NullPointerException e) {
                throw new SeatSelectionException("Invalid seat selection");
            }

            if (currentAvailable == 0)
                throw new SeatSelectionException("No more seats available");

            if (currentAvailable - quantity < 0)
                throw new SeatSelectionException("Invalid quantity");

            for (int i = 0; i < quantity; i++) {
                Integer seatNumber = maxCapacity - currentAvailable + 1;

                Ticket t = new Ticket(
                        new CompositeKey(event.getEventID(), eventDateID.toString(),
                                section, row, seatNumber),
                        user, category, orderID, orderDateTime);
                addTicket(t);
                allocatedTickets.add(t);
                currentAvailable--;
            }

            sectionMap.put(row, currentAvailable);
        }

        eventsvc.put(event);

        return allocatedTickets;
    }

    public ResponseEntity<?> verifyRecaptcha(RecaptchaRequest recaptchaRequest) {
        RecaptchaResponse recap = WebClient.create().post()
                .uri("https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={response}",
                        RecaptchaObject.getSecret(), recaptchaRequest.getRecaptchaToken())
                .exchangeToMono(response -> response.bodyToMono(RecaptchaResponse.class)).block();

        if (recap.getSuccess().equals("true"))
            return ResponseEntity.noContent().build();
        return ResponseEntity.badRequest().body(recap.getError());
    }

    private String createOrderId() {
        return UUID.randomUUID().toString();
    }

    private LocalDateTime createOrderDate() {
        return LocalDateTime.now();
    }

    private EventDate findEventDate(Event event, String eventDateID) {
        for (EventDate d : event.getDate()) {
            if (d.getID().toString().equals(eventDateID))
                return d;
        }

        throw new EventDateNotFoundException();
    }
}
