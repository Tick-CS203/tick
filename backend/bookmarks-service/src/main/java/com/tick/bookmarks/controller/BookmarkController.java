package com.tick.bookmarks.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.io.IOException;

import com.tick.bookmarks.service.*;
import com.tick.bookmarks.entity.*;
import com.tick.bookmarks.security.*;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
    private BookmarkService svc;
    private EventRequest req;

    @Autowired
    public BookmarkController(BookmarkService svc, EventRequest req) {
        this.svc = svc;
        this.req = req;
    }

    @GetMapping
    public Iterable<Bookmark> get_all_bookmarks()
        throws IOException {
        return svc.findAll();
    }

    @GetMapping("/user")
    public Bookmark user_bookmarks(TokenAuthentication auth) throws IOException
    {
        String id = (String) auth.getPrincipal();

        return svc.findBookmark(id);
    }

    @DeleteMapping("/{event}")
    public Bookmark delete_bookmark(@PathVariable String event,
            TokenAuthentication auth
            ) throws IOException
    {
        verify_event(event);
        String id = (String) auth.getPrincipal();

        return svc.delete_bookmark(id, event);
    }

    @PostMapping("/{event}")
    @ResponseStatus(HttpStatus.CREATED)
    public Bookmark add_bookmark(@PathVariable String event,
            TokenAuthentication auth
            ) throws IOException
    {
        verify_event(event);
        String id = (String) auth.getPrincipal();

        return svc.add_bookmark(id, event);
    }

    private void verify_event(String event) {
        req.post(event);
    }
}
