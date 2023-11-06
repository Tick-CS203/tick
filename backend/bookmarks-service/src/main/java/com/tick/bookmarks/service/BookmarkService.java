package com.tick.bookmarks.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tick.bookmarks.entity.*;
import com.tick.bookmarks.repository.*;

@Component
public class BookmarkService {
    private BookmarkRepository repo;

    @Autowired
    public BookmarkService(BookmarkRepository repo) {
        this.repo = repo;
    }

    public Iterable<Bookmark> findAll() {
        return repo.findAll();
    }

    public Bookmark add_bookmark(String id, String event) {
        return repo.save(getBookmark(id).map(
                user -> user.addEvent(event)
                ).orElse(new Bookmark(id).addEvent(event)));
    }

    public Bookmark delete_bookmark(String id, String event) {
        return getBookmark(id).map(
                user -> {
                    user.removeEvent(event);
                    return repo.save(user);
                }).orElse(new Bookmark(id));
    }

    public Bookmark findBookmark(String id) {
        return getBookmark(id).orElse(new Bookmark(id));
    }

    private Optional<Bookmark> getBookmark(String id) {
        return repo.findByUserID(id);
    }
}
