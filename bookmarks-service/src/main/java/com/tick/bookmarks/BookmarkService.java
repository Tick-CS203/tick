package com.tick.bookmarks;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookmarkService {
    private BookmarkRepository repo;

    @Autowired
    public BookmarkService(BookmarkRepository repo) {
        this.repo = repo;
    }

    public Iterable<UserMarks> findAll() {
        return repo.findAll();
    }

    public UserMarks add_bookmark(Bookmark bookmark) {
        String id = bookmark.user();
        return repo.save(getUserMarks(id).map(
                user -> {return user.addEvent(bookmark);}
                ).orElse(new UserMarks(id).addEvent(bookmark)));
    }

    public UserMarks findUser(String id) {
        return getUserMarks(id).orElse(null);
    }

    private Optional<UserMarks> getUserMarks(String id) {
        return repo.findByUserID(id);
    }
}
