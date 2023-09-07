package com.tick.bookmarks;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
    private BookmarkService svc;

    @Autowired
    public BookmarkController(BookmarkService svc) {
        this.svc = svc;
    }

    @GetMapping
    public Iterable<Bookmark> get_all_bookmarks()
        throws IOException {
        return svc.findAll();
    }

    @PostMapping
    public Bookmark add_bookmark(@RequestBody Bookmark bookmark)
        throws IOException {
        return svc.add(bookmark);
    }
}
