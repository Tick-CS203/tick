package com.tick.bookmarks;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.mockito.Mock;
import org.mockito.InjectMocks;
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

    boolean eventInBookmark(Bookmark bookmark, long newEvent) {
        for (long event : bookmark.getEventList()) {
            if (event == newEvent) {
                return true;
            }
        }
        return false;
    }

    @Test
    void addBookmark_ValidUserID_Success() {
        Bookmark bookmark = new Bookmark("Peter Pan");

        when(bookmarkRepository.save(bookmark)).thenReturn(bookmark);

        Bookmark result = bookmarkService.add_bookmark("Peter Pan", 2);

        assertEquals(bookmark.getUserID(), result.getUserID());
        assertEquals(eventInBookmark(result, 2), true);
        verify(bookmarkRepository).save(bookmark);
    }
    
    @Test
    void addBookmark_InvalidUserID_ThrowException() {
        Bookmark bookmark = new Bookmark("Peter Pan");
        
        when(bookmarkRepository.save(bookmark)).thenReturn(null);
        when(bookmarkRepository.findByUserID(bookmark.getUserID())).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            bookmarkService.add_bookmark("Peter Pan", 2);
        });

        verify(bookmarkRepository).findByUserID(bookmark.getUserID());
    }

    @Test
    void deleteBookmark_ValidEventID_Success() {
        Bookmark bookmark = new Bookmark("Peter Pan");
        bookmark.addEvent(2);

        when(bookmarkRepository.findByUserID(bookmark.getUserID())).thenReturn(Optional.of(bookmark));
        when(bookmarkRepository.save(bookmark)).thenReturn(bookmark.removeEvent(2));

        bookmarkService.delete_bookmark("Peter Pan", 2);

        verify(bookmarkRepository).findByUserID(bookmark.getUserID());
        verify(bookmarkRepository).save(bookmark);
    }
    
    @Test
    void deleteBookmark_InvalidUserID_ThrowException() {
        Bookmark bookmark = new Bookmark("Peter Pan");

        when(bookmarkRepository.findByUserID(bookmark.getUserID())).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> {
            bookmarkService.delete_bookmark("Peter Pan", 2);
        });

        verify(bookmarkRepository).findByUserID(bookmark.getUserID());
    }
}
