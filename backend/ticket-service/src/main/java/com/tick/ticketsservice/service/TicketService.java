package com.tick.ticketsservice.service;

import java.util.*;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.tick.ticketsservice.model.*;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.repository.TicketRepository;
import com.tick.ticketsservice.exception.*;

@Service
public class TicketService {
    private TicketRepository ticketRepository;
    private String event_host;
    private String token_host;

    @Autowired
    public TicketService(TicketRepository repo,
            @Value("${EVENT_HOST}") String event_host,
            @Value("${TOKEN_HOST}") String token_host
            ) {
        ticketRepository = repo;
        this.event_host = event_host;
        this.token_host = token_host;
    }


    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket addTicket(Ticket ticket) {
        // check that event date ID is valid
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketByUserId(String userId) {
        return ticketRepository.findByUser(userId);
    }

    public Ticket getTicketByKey(CompositeKey key){
        return ticketRepository.findByKey(key).orElse(null);
    }

    //if user transfers ticket
    public Ticket updateTicket(Ticket updatedTicket) {
        return ticketRepository.save(
                ticketRepository.findByKey(updatedTicket.getKey()).map(
                    ticket -> updatedTicket).orElse(null));
    }

    //if user deactivates account
    public List<Ticket> releaseTicket(String userId) {
         List<Ticket> tickets = ticketRepository.findByUser(userId);
         tickets.forEach(ticket -> ticket.setUser(null));

         return ticketRepository.saveAll(tickets);
    }

    //if event is cancelled
    public String deleteTicketByEvent(String eventId){
        List<Ticket> tickets = ticketRepository.findAll();
        tickets.forEach(ticket -> {
            CompositeKey key = ticket.getKey();
            if (eventId.equals(key.getEventDate())) ticketRepository.deleteByKey(key);
        });
        return "event " + eventId + "'s tickets have been deleted";
    }

    //if user transfers ticket
    //is it possible for user to get a refund?
    public String deleteTicketByTicketId(CompositeKey key) {
        ticketRepository.deleteByKey(key);
        return key + "ticket has been deleted";
    }

    // [{category: "CAT1", section: "PC1", row: "C", quantity: 2}, {category: "CAT2", section: "140", row: "B", quantity: 1}]
    public List<Ticket> allocateSeats(String eventID, String eventDate, List<SelectedRow> selectedRows, String token) {
        Event event = null;
        String user;
        System.out.println(event_host + "eventID: " + eventID);
        try {
            event = WebClient.create("http://" + event_host + ":8080/event/" + eventID)
                .get().exchangeToMono(response -> {
                    if (response.statusCode().value() == 404)
                        return response.createError();
                    return response.bodyToMono(Event.class);
                }).block();
            user = WebClient.create("http://" + token_host + ":8080/access/purchasing")
                .post().bodyValue("{\"token\":"+token+'}')
                .exchangeToMono(response -> {
                    if (response.statusCode().value() == 400)
                        return response.createError();
                    return response.bodyToMono(TokenResponse.class);
                }).block().id();
        } catch (WebClientResponseException e) {
            int code = e.getStatusCode().value();
            if (code == 400) throw new UnauthorisedException();
            throw new EventNotFoundException();
        }

        EventDate date = null;
        List<EventDate> dateList = event.getDate();
        for (int i = 0; i < dateList.size(); i++) {
            EventDate d = dateList.get(i);
            if (d.getEventID().toString().equals(eventDate)) {
                date = d;
                dateList.remove(i);
                break;
            }
        }

        if (date == null) throw new RuntimeException();

        Map<String, Map<String, Map<String, Integer>>> seatAvailability = date.getSeatAvailability();

        Map<String, Map<String, Map<String, Integer>>> seatMap = event.getSeatMap();

        Integer totalQuantity = 0;
        for (SelectedRow rowObj : selectedRows) {
            totalQuantity += rowObj.getQuantity();
        }
        if (totalQuantity >= event.getTicketLimit())
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
            // if (maxCapacity == null)
            //     throw new Error("Invalid seat selection");

            if (currentAvailable == 0)
                throw new Error("No more seats available");

            if (currentAvailable - quantity < 0)
                throw new Error("Invalid quantity");

            for (int i = 0; i < quantity; i++) {
                Integer seatNumber = maxCapacity - currentAvailable + 1;

                Ticket t = new Ticket(new CompositeKey(eventDate.toString(), section, row, seatNumber), user, category);
                addTicket(t);
                allocatedTickets.add(t);
                currentAvailable--;
            }

            Map<String, Map<String, Integer>> categoryMap = seatAvailability.get(category);
            Map<String, Integer> sectionMap = categoryMap.get(section);
            sectionMap.put(row, currentAvailable);
        }

        date.setSeatAvailability(seatAvailability);
        dateList.add(date);
        event.setDate(dateList);

        try {
            WebClient.create("http://" + event_host + ":8080/event")
                .put().bodyValue(event).retrieve()
                .bodyToMono(Object.class)
                .block();
        } catch (WebClientResponseException e) {
            throw new EventUpdateException();
        }

        return allocatedTickets;
    }

    public Mono<Object> verifyRecaptcha(String recaptchaToken) {
        return WebClient.create().post()
            .uri("https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={response}",
                    RecaptchaObject.getSecret(), recaptchaToken
                )
            .retrieve()
            .toEntity(Object.class)
            .flatMap(responseEntity -> {
                System.out.println("Verified Recaptcha: " + responseEntity.getBody());
                return Mono.just(responseEntity.getBody());
            }
            ); 
    }
}
