package com.tick.ticketsservice.service;

import java.util.*;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;

import com.tick.ticketsservice.model.Ticket;
import com.tick.ticketsservice.model.RecaptchaObject;
import com.tick.ticketsservice.model.Ticket.CompositeKey;
import com.tick.ticketsservice.repository.TicketRepository;

@Service
@AllArgsConstructor
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private final WebClient webClient;

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket addTicket(Ticket ticket) {
        // check that event date ID is valid
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTicketByUserId(String userId) {
        return ticketRepository.findByUserId(userId);
    }

    public Ticket getTicketById(CompositeKey key){
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
         List<Ticket> tickets = ticketRepository.findByUserId(userId);
         for(Ticket ticket : tickets) {
            ticket.setUserId(null);
         }

         return ticketRepository.saveAll(tickets);
    }

    //if event is cancelled
    public String deleteTicketByEvent(String eventId){
        List<Ticket> tickets = ticketRepository.findAll();
        for (Ticket ticket : tickets) {
            CompositeKey key = ticket.getKey();
            if (eventId.equals(key.getEventDateId())) ticketRepository.deleteByKey(key);
        }
        return "event " + eventId + "'s tickets have been deleted";
    }

    //if user transfers ticket
    //is it possible for user to get a refund?
    public String deleteTicketByTicketId(CompositeKey key) {
        ticketRepository.deleteByKey(key);
        return key + "ticket has been deleted";
    }
    
    public Mono<Object> verifyRecaptcha(String recaptchaToken) {
        return webClient.post()
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
