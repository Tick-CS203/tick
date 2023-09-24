package com.tick.bookmarks;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookmarkService {
    private BookmarkRepository repo;

    @Autowired
    public BookmarkService(BookmarkRepository repo) {
        this.repo = repo;
    }

    public Iterable<User> findAll() {
        return repo.findAll();
    }

    public User add_bookmark(String id, long event) {
        return repo.save(getUser(id).map(
                user -> user.addEvent(event)
                ).orElse(new User(id).addEvent(event)));
    }

    public User delete_bookmark(String id, long event) {
        return getUser(id).map(
                user -> {
                    user.removeEvent(event);
                    return repo.save(user);
                }).orElse(new User(id));
    }

    public User findUser(String id) {
        return getUser(id).orElse(new User(id));
    }

    private Optional<User> getUser(String id) {
        return repo.findByUserID(id);
    }
}
