package com.tick.bookmarks;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

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
    public Iterable<UserMarks> get_all_bookmarks()
        throws IOException {
        return svc.findAll();
    }

    @GetMapping("/{id}")
    public UserMarks user_bookmarks(
            @PathVariable String id
            ) throws IOException {
        return svc.findUser(id);
            }

    @PostMapping
    public UserMarks add_bookmark(@RequestBody Bookmark bookmark)
        throws IOException {
        return svc.add_bookmark(bookmark);
    }
}
