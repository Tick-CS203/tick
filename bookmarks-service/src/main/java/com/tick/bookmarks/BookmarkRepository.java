package com.tick.bookmarks;

import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface BookmarkRepository extends CrudRepository<User, Long> {
    public Optional<User> findByUserID(String userid);
}
