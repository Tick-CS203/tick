package com.tick.model;

import com.tick.exception.*;
import java.time.*;
import java.util.*;
import java.lang.reflect.*;

import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.*;
import jakarta.validation.constraints.*;

@Data
class Links {
    private String websiteURL;
    private String instagramURL;
    private String youtubeURL;
    private String facebookURL;
    private String spotifyURL;
    private String twitterURL;
    private String appleMusicURL;
}

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @NotBlank
    private String eventID;
    private String name;
    private String description;
    @NotNull
    private String category;
    private String banner;
    @NotBlank
    private String artist;
    @Null
    private LocalDateTime lastUpdated;
    @NotNull
    private List<Price> prices;
    @Min(value = 1)
    @NotNull
    private Integer ticketLimit;
    @NotBlank
    private String venueID;
    @Null
    private Map<String, Map<String, Map<String, Integer>>> seatMap;
    @NotNull
    private List<@Valid EventDate> date;
    private Links links;

    public Event upsert(Event e) {
        try {
            Class<Event> eventClass = Event.class;
            for (Field field : eventClass.getDeclaredFields()) {
                Object value = field.get(e);
                if (value != null) {
                    field.set(this, value);
                }
            }
        } catch (IllegalAccessException exception) {
            exception.printStackTrace();
        }

        return this;
    }

    public Event addEventDate(EventDate date) {
        try {
            findEventDate(date.getEventDateID());
            throw new EventDateExistsException();
        } catch (EventDateNotFoundException e) {
            this.date.add(date);
        }
        return this;
    }

    public Event removeEventDate(String eventDateID) {
        this.date.remove(findEventDate(eventDateID));
        return this;
    }

    public EventDate findEventDate(String eventDateID) {
        for (EventDate date : this.date) {
            if (eventDateID.equals(date.getEventDateID())) {
                return date;
            }
        }

        throw new EventDateNotFoundException(eventDateID);
    }
    
    public void setEventID(String eventID) {
        this.eventID = eventID;
    }
}
