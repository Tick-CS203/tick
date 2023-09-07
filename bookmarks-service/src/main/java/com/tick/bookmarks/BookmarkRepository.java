package com.tick.bookmarks;

import org.springframework.data.repository.CrudRepository;

public interface BookmarkRepository extends CrudRepository<Bookmark, Long> {
    public Bookmark findByUserid(String userid);
}
