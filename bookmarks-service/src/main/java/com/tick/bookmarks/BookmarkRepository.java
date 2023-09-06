package com.tick.bookmarks;

import org.springframework.data.repository.CrudRepository;
import com.tick.entity.BookmarkPairs;

public interface BookmarkRepository extends CrudRepository<BookmarkPairs, Long> {}
