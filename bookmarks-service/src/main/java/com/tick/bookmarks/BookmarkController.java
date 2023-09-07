package com.tick.bookmarks;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
    private BookmarkRepository repo;

    @Autowired
    public BookmarkController(BookmarkRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public Iterable<Bookmark> get_all_bookmarks()
        throws IOException {
        return repo.findAll();
    }

    @PostMapping
    public Bookmark add_bookmark(@RequestBody Bookmark bookmark)
        throws IOException {
        return repo.save(bookmark);
    }
}
