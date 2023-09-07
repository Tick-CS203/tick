package com.tick.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.tick.model.Event;
import java.util.List;

public interface CustomEventRepository extends MongoRepository<Event, String> {
}