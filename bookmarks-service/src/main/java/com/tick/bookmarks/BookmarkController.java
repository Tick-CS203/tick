package com.tick.bookmarks;

import org.springframework.web.bind.annotation.*;
import com.tick.repo.BookmarkRepository;
import com.tick.entity.BookmarkPairs;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
    private BookmarkRepository repo;

    @GetMapping
    public Iterable<BookmarkPairs> get_all_bookmarks()
        throws IOException {
        return repo.findAll();
    }

    @PostMapping
    public BookmarkPairs add_bookmark(@RequestBody BookmarkPairs bookmark)
        throws IOException {
        return repo.save(bookmark);
    }
}
