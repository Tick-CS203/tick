// Events.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Events } from './Events';
import { useEventsQuery, useFilteredEventsQuery } from "../api/events.query.js";

// Mock the external hooks from events.query.js
jest.mock('../api/events.query.js', () => ({
  useEventsQuery: jest.fn(),
  useFilteredEventsQuery: jest.fn()
}));

describe('Events Component', () => {
  // Mock data for our tests
  const mockEvents = [
    { eventID: '1', banner: 'image1.jpg', name: 'Event 1', date: '2023-05-01T00:00:00' },
    { eventID: '2', banner: 'image2.jpg', name: 'Event 2', date: '2023-05-02T00:00:00' }
  ];

  beforeEach(() => {
    // Mock implementation of useEventsQuery
    useEventsQuery.mockReturnValue({
      data: mockEvents,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    });
    
    // Mock implementation of useFilteredEventsQuery
    useFilteredEventsQuery.mockReturnValue({
      data: mockEvents
    });
  });

  test('renders loading state', () => {
    useEventsQuery.mockReturnValueOnce({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null
    });

    const { getByText } = render(<Events />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useEventsQuery.mockReturnValueOnce({
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: 'Error 404: Events not found'
    });

    const { getByText } = render(<Events />);
    expect(getByText('Error 404: Events not found')).toBeInTheDocument();
  });
});

