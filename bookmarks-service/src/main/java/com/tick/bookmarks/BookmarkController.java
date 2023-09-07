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
    public Iterable<User> get_all_bookmarks()
        throws IOException {
        return svc.findAll();
    }

    @GetMapping("/{id}")
    public User user_bookmarks(@PathVariable String id)
        throws IOException {
        return svc.findUser(id);
    }

    @DeleteMapping("/{id}/{event}")
    public User delete_bookmark(
            @PathVariable String id,
            @PathVariable long event)
        throws IOException {
        return svc.delete_bookmark(id, event);
    }

    @PostMapping
    public User add_bookmark(@RequestBody Bookmark bookmark)
        throws IOException {
        return svc.add_bookmark(bookmark);
    }
}
