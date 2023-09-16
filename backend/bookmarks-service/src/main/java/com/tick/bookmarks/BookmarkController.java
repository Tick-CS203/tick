package com.tick.bookmarks;

import com.tick.exceptions.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Map;
import java.util.function.Function;
import java.util.function.BiFunction;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
    private BookmarkService svc;
    private Request req;

    @Autowired
    public BookmarkController(BookmarkService svc, Request req) {
        this.svc = svc;
        this.req = req;
    }

    @GetMapping
    public Iterable<User> get_all_bookmarks()
        throws IOException {
        return svc.findAll();
    }

    @GetMapping("/user")
    public ResponseEntity<?> user_bookmarks(
            @RequestHeader Map<String, String> headers
            ) throws IOException
    {
        String token = headers.get("authorization");

        return verify_token(svc::findUser, token);
    }

    @DeleteMapping("/{event}")
    public ResponseEntity<?> delete_bookmark(
            @RequestHeader Map<String, String> headers,
            @PathVariable long event
            ) throws IOException
    {
        String token = headers.get("authorization");

        return verify_token(svc::delete_bookmark, token, event);
    }

    @PostMapping("/{event}")
    public ResponseEntity<?> add_bookmark(
            @RequestHeader Map<String, String> headers,
            @PathVariable long event
            ) throws IOException
    {
        String token = headers.get("authorization");

        return verify_token(svc::add_bookmark, token, event);
    }

    private ResponseEntity<?> verify_token(Function<String, User> func, String token) {
        String id;
        try {
            id = req.post(Host.TOKEN, token);
            User usr = func.apply(id);
            return ResponseEntity.ok().body(usr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(new ErrorMessage("Unauthorised"));
        }
    }

    private ResponseEntity<?> verify_token(BiFunction<String, Long, User> func, String token, long event) {
        String id;
        try {
            id = req.post(Host.TOKEN, token);
            req.post(Host.EVENT, event);
            User usr = func.apply(id, event);
            return ResponseEntity.ok().body(usr);
        } catch (UnauthorisedException e) {
            return ResponseEntity.status(401).body(new ErrorMessage("Unauthorised"));
        } catch (EventNotFoundException e) {
            return ResponseEntity.status(404).body(new ErrorMessage("Event not found"));
        }
    }
}

record ErrorMessage(String error) {}
