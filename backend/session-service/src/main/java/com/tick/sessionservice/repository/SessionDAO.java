package com.tick.sessionservice.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.tick.sessionservice.entity.Session;

@Repository
public class SessionDAO {
    public static final String HASH_KEY = "Queue";

    @Autowired
    private RedisTemplate<String, Object> template;

    public void save(Session session) {
        template.opsForHash().put(HASH_KEY, session.getId(), session);
    }

    public Session findSessionById(String id) {
        return (Session) template.opsForHash().get(HASH_KEY, id);
    }

    public void deleteSessionById(String id) {
        template.opsForHash().delete(HASH_KEY, id);
    }
}

