package com.tick.eventdateservice.service;

import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import com.tick.eventdateservice.model.EventDate;
import com.tick.eventdateservice.model.SelectedRow;
import com.tick.eventdateservice.repository.EventDateRepository;

@Service
@AllArgsConstructor
public class EventDateService {

    @Autowired
    private final EventDateRepository eventDateRepository;
    @Autowired
    private final WebClient webClient;

    private final Integer purchaseLimit = 4;

    public EventDate addEventDate(EventDate eventDate) {
        return eventDateRepository.save(eventDate);
    }
    
    public Map<String, Map<String, Map<String, Integer>>> getSeatAvailability(String eventDateID) {
        return eventDateRepository.findById(eventDateID).get().getSeatAvailability();
    }

    // Mono: single or empty value
    // Flux: 0 to many values
    public Mono<Event> findEventById(String eventID) {
        return webClient.get()
                .uri("/api/event/" + eventID)
                .retrieve()
                .onStatus(httpStatus -> HttpStatus.NOT_FOUND.equals(httpStatus), clientResponse -> Mono.empty())
                .bodyToMono(Event.class);
    }
    
    public Mono<Ticket> createTicket(Ticket ticket) {
        ticket = new Ticket("64ed8da9d11f0b279d6f6a41","CAT4", "441", "A", 1, "Peter Pan");

        return webClient.post()
            .uri("/api/ticket")
            .body(Mono.just(Ticket), Ticket.class)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response -> {
                return Mono.just(new ApplicationException("Bad Request"));
            })
            .onStatus(HttpStatusCode::is5xxServerError, response -> {
                return Mono.just(new ApplicationException("Server Error"));
            })
            .toEntity(Ticket.class)
            .subscribe(responseEntity -> {
                System.out.println("Created New Ticket: " + responseEntity.getBody());
            });

    }

    // [{category: "CAT1", section: "PC1", row: "C", quantity: 2}, {category: "CAT2", section: "140", row: "B", quantity: 1}]
    public List<Ticket> allocateSeats(String eventDateID, List<SelectedRow> selectedRows) {

        EventDate eventDate = eventDateRepository.findById(eventDateID).get();
        if (eventDate == null)
            throw new Error("Event date not found");

        Map<String, Map<String, Map<String, Integer>>> seatAvailability = eventDate.getSeatAvailability();
        
        Event event = findEventById(eventDate.getEventID());
        if (event == null)
            throw new Error("Event not found");

        Map<String, Map<String, Map<String, Integer>>> seatMap = event.getSeatMap();

        Integer totalQuantity = 0;
        for (SelectedRow rowObj : selectedRows) {
            totalQuantity += rowObj.getQuantity();
        }
        if (totalQuantity >= purchaseLimit)
            throw new Error("Selected quantity is above purchase limit");

        List<Ticket> allocatedTickets = new ArrayList<>();

        for (SelectedRow rowObj : selectedRows) {

            String category = rowObj.getCategory();
            String section = rowObj.getSection();
            String row = rowObj.getRow();
            Integer quantity = rowObj.getQuantity();

            Integer currentAvailable = seatAvailability.get(category).get(section).get(row);
            if (currentAvailable == null)
                throw new Error("Invalid seat selection");

            Integer maxCapacity = seatMap.get(category).get(section).get(row);
            if (maxCapacity == null)
                throw new Error("Invalid seat selection");

            if (currentAvailable == 0)
                throw new Error("No more seats available");

            if (currentAvailable - quantity < 0)
                throw new Error("Invalid quantity");

            for (int i = 0; i < quantity; i++) {
                Integer seatNumber = maxCapacity - currentAvailable + 1;

                Ticket t = new Ticket(eventDateID, category, section, row, seatNumber, "Peter Pan");
                createTicket(t);
                allocatedTickets.add(t);
                currentAvailable--;
            }

            Map<String, Map<String, Integer>> categoryMap = seatAvailability.get(category);
            Map<String, Integer> sectionMap = categoryMap.get(section);
            sectionMap.put(row, currentAvailable);
        }

        eventDate.setSeatAvailability(seatAvailability);
        eventDateRepository.save(eventDate);

        return allocatedTickets;
    }
    
     public String deleteEventDate(String eventDateID) {
        eventDateRepository.deleteById(eventDateID);
        return eventDateID + " event date deleted successfully";
    }
}
