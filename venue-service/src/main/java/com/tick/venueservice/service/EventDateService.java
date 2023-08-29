package com.tick.venueservice.service;

import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tick.venueservice.model.EventDate;
import com.tick.venueservice.model.SelectedRow;
import com.tick.venueservice.model.Ticket;
import com.tick.venueservice.repository.EventDateRepository;
import com.tick.venueservice.repository.TicketRepository;
import com.tick.venueservice.repository.VenueRepository;

@Service
@AllArgsConstructor
public class EventDateService {

    @Autowired
    private final EventDateRepository eventDateRepository;
    @Autowired
    private final TicketRepository ticketRepository;
    @Autowired
    private final VenueRepository venueRepository;

    private final Integer purchaseLimit = 4;

    public EventDate addEventDate(EventDate ed) {
        return eventDateRepository.save(ed);
    }
    
    public Map<String, Map<String, Map<String, Integer>>> getSeatAvailability(String eventDateID) {
        return eventDateRepository.findById(eventDateID).get().getSeatAvailability();
    }

    // [{category: "CAT1", section: "PC1", row: "C", quantity: 2}, {category: "CAT2", section: "140", row: "B", quantity: 1}]
    public List<Ticket> allocateSeats(String eventDateID, List<SelectedRow> selectedRows) {

        EventDate ed = eventDateRepository.findById(eventDateID).get();
        if (ed == null)
            throw new Error("Event date not found");

        Map<String, Map<String, Map<String, Integer>>> seatAvailability = ed.getSeatAvailability();
        Map<String, Map<String, Map<String, Integer>>> seatMap = venueRepository.findById(ed.getVenueID())
                .get().getSeatMap();

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

                Ticket t = new Ticket(eventDateID, category, section, row, seatNumber, "PP", "Peter Pan");
                allocatedTickets.add(t);
                ticketRepository.save(t);
                currentAvailable--;
            }

            Map<String, Map<String, Integer>> categoryMap = seatAvailability.get(category);
            Map<String, Integer> sectionMap = categoryMap.get(section);
            sectionMap.put(row, currentAvailable);
        }

        ed.setSeatAvailability(seatAvailability);
        eventDateRepository.save(ed);

        return allocatedTickets;
    }
    
     public String deleteEventDate(String eventDateID) {
        eventDateRepository.deleteById(eventDateID);
        return eventDateID + " event date deleted successfully";
    }
}
