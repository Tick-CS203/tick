package com.tick.ticketservice.service;

import java.util.List;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestScope;
import org.springframework.web.reactive.function.client.WebClient;

import com.tick.ticketservice.model.RecaptchaObject;
import com.tick.ticketservice.model.Ticket;
import com.tick.ticketservice.repository.TicketRepository;

@Service
@AllArgsConstructor
public class TicketService {

    @Autowired
    private final TicketRepository ticketRepository;

    @Autowired
    private final WebClient webClient;

    public Ticket addTicket(Ticket v) {
        return ticketRepository.save(v);
    }

    public List<Ticket> findAllTickets() {
        return ticketRepository.findAll();
    }
    
    public Ticket getTicketById(String ticketId) {
        return ticketRepository.findById(ticketId).get();
    }

    public Ticket updateTicket(Ticket ticketRequest) {
        Ticket existingTicket = ticketRepository.findById(ticketRequest.getId()).get();
        existingTicket.setEventDateID(ticketRequest.getEventDateID());
        existingTicket.setCategory(ticketRequest.getCategory());
        existingTicket.setSection(ticketRequest.getSection());
        existingTicket.setRow(ticketRequest.getRow());
        existingTicket.setSeatNumber(ticketRequest.getSeatNumber());
        existingTicket.setUserID(ticketRequest.getUserID());
        return ticketRepository.save(existingTicket);
    }

    public String deleteTicket(String ticketId) {
        ticketRepository.deleteById(ticketId);
        return ticketId + " ticket deleted successfully";
    }

    public Mono<Object> verifyRecaptcha(String recaptchaToken) {
        RecaptchaObject requestObj = new RecaptchaObject(recaptchaToken);

        return webClient.post()
            .uri("https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={response}",
                requestObj.getSecret(), requestObj.getResponse()
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
