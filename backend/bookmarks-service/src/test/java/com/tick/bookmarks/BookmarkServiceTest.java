package com.tick.bookmarks;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.mockito.Mock;
import org.mockito.InjectMocks;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.web.server.ResponseStatusException;

import com.tick.bookmarks.repository.BookmarkRepository;
import com.tick.bookmarks.service.BookmarkService;
import com.tick.bookmarks.entity.Bookmark;

@ExtendWith(MockitoExtension.class)
public class BookmarkServiceTest {
    @Mock
    private BookmarkRepository bookmarkRepository;

    @InjectMocks
    private BookmarkService bookmarkService;

    boolean eventInBookmark(Bookmark bookmark, String newEvent) {
        for (String event : bookmark.getEventList()) {
            if (event.equals(newEvent)) {
                return true;
            }
        }
        return false;
    }

    @Test
    void addBookmark_Success() {
        Bookmark bookmark = new Bookmark("Peter Pan");
        String eventID = "2";

        when(bookmarkRepository.findByUserID(bookmark.getUserID())).thenReturn(Optional.of(bookmark));
        when(bookmarkRepository.save(any(Bookmark.class))).thenReturn(bookmark);

        Bookmark result = bookmarkService.add_bookmark(bookmark.getUserID(), eventID);

        assertEquals(bookmark.getUserID(), result.getUserID());
        assertTrue(eventInBookmark(result, eventID));

        verify(bookmarkRepository).findByUserID(bookmark.getUserID());
        verify(bookmarkRepository).save(bookmark);
    }

    @Test
    void deleteBookmark_Success() {
        Bookmark bookmark = new Bookmark("Peter Pan");
        bookmark.addEvent("2");

        when(bookmarkRepository.findByUserID(bookmark.getUserID())).thenReturn(Optional.of(bookmark));
        when(bookmarkRepository.save(bookmark)).thenReturn(bookmark.removeEvent("2"));

        bookmarkService.delete_bookmark("Peter Pan", "2");

        verify(bookmarkRepository).findByUserID(bookmark.getUserID());
        verify(bookmarkRepository).save(bookmark);
    }
}
