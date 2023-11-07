package com.venue;

import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.venue.repository.VenueRepository;
import com.venue.service.VenueService;

@ExtendWith(MockitoExtension.class)
public class VenueServiceTest {
    @Mock
    private VenueRepository venueRepository;

    @InjectMocks
    private VenueService venueService;

    @Test
    void getVenue_InvalidVenueID_ThrowException() {
        String venueID = "fake_venue";
        when(venueRepository.findById(venueID)).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> {
            venueService.getVenue(venueID);
        });

        verify(venueRepository).findById(venueID);
    }
}
