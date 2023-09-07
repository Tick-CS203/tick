package com.tick.bookmarks;

import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface BookmarkRepository extends CrudRepository<UserMarks, Long> {
    public Optional<UserMarks> findByUserID(String userid);
}
