package com.tick.bookmarks;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Map;

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

    @GetMapping("/user")
    public ResponseEntity<?> user_bookmarks(
            @RequestHeader Map<String, String> headers
            ) throws IOException {
        String token = headers.get("authorisation");
        String id;
        try {
            id = TokenRequest.post(token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(new ErrorMessage("Unauthorised"));
        }

        return ResponseEntity.ok().body(svc.findUser(id));
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
