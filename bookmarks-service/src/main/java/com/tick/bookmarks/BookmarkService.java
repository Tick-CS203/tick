package com.tick.bookmarks;

import org.springframework.beans.factory.annotation.Autowired;

public class BookmarkService {
    private BookmarkRepository repo;

    public BookmarkService(BookmarkRepository repo) {
        this.repo = repo;
    }

    public Iterable<Bookmark> findAll() {
        return repo.findAll();
    }

    public Bookmark add(Bookmark bookmark) {
        System.out.println(repo.findByUserid(bookmark.getUserid()));
        return repo.save(bookmark);
    }
}
