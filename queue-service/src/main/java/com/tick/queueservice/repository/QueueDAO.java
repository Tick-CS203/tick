package com.tick.queueservice.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import com.tick.queueservice.entity.Queue;

@Repository
public class QueueDAO {
    public static final String HASH_KEY = "Queue";

    @Autowired
    private RedisTemplate<String, Object> template;

    public Queue save(Queue queue) {
        if (queue.getId() == null || queue.getTokenQueue() == null) throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "missing fields"
        );

        template.opsForHash().put(HASH_KEY, queue.getId(), queue);
        return queue;
    }

    public Queue findQueueById(String id) {
        Queue queue = (Queue) template.opsForHash().get(HASH_KEY, id);

        if (queue == null) throw new ResponseStatusException(
            HttpStatus.NOT_FOUND, 
            String.format("queue with id %s not found", id)
        );

        return queue;
    }

    public String deleteQueueById(String id) {
        Long numOfDeleted = template.opsForHash().delete(HASH_KEY, id);

        if (numOfDeleted == 0) throw new ResponseStatusException(
            HttpStatus.NOT_FOUND, 
            String.format("queue with id %s not found", id)
        );

        return String.format("queue with id %s was deleted", id);
    }
}
