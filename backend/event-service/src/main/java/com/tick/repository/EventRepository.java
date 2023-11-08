package com.tick.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tick.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByCategory(String category);

    @Query(value = "{'name': {$regex : ?0, $options: 'i'}}")
    List<Event> findByNameRegex(String regex);

    @Query(value = "{'name': {$regex : ?0, $options: 'i'}}")
    Optional<Event> findFirstByArtistRegex(String artist);
}
