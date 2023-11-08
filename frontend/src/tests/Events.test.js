import React from 'react';
import { render } from '@testing-library/react';
import { Events } from '../pages/Events';
import { useEventsQuery, useFilteredEventsQuery } from "../api/events.query.js";

// Replace actual hooks with mock functions to control their behavior in tests
jest.mock('../api/events.query.js', () => ({
  useEventsQuery: jest.fn(),
  useFilteredEventsQuery: jest.fn()
}));

// Describes a block of tests for the Events component
describe('Events Component', () => {
  // Arrange: Define mock event data that will be used in multiple tests
  const mockEvents = [
    { eventID: '1', banner: 'image1.jpg', name: 'Event 1', date: '2023-05-01T00:00:00' },
    { eventID: '2', banner: 'image2.jpg', name: 'Event 2', date: '2023-05-02T00:00:00' }
  ];

  beforeEach(() => {
    // Arrange: Setup the default return values for hooks before each test
    // This simulates successful data fetching
    useEventsQuery.mockReturnValue({
      data: mockEvents,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    });
    
    // Arrange: Mocks the behavior of the filtered events hook with the same data
    useFilteredEventsQuery.mockReturnValue({
      data: mockEvents
    });
  });

  // Test to verify loading state is rendered correctly
  test('renders loading state', () => {
    // Arrange: Override the hook's return value to simulate loading state
    useEventsQuery.mockReturnValueOnce({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null
    });

    // Act: Render the Events component
    const { getByText } = render(<Events />);

    // Assert: The loading message is displayed
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  // Test to verify error state is rendered correctly
  test('renders error state', () => {
    // Arrange: Override the hook's return value to simulate an error state
    useEventsQuery.mockReturnValueOnce({
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: 'Error 404: Events not found'
    });

    // Act: Render the Events component
    const { getByText } = render(<Events />);

    // Assert: The error message is displayed
    expect(getByText('Error 404: Events not found')).toBeInTheDocument();
  });
});
