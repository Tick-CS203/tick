package com.tick.bookmarks.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.tick.bookmarks.entity.Bookmark;

@Repository
public interface BookmarkRepository extends CrudRepository<Bookmark, String> {
    public Optional<Bookmark> findByUserID(String userid);
}
