import React from 'react';
import { render } from '@testing-library/react';
import { MyTickets } from '../pages/MyTickets';
import { useSelector } from 'react-redux';
import { useTicketsQuery } from '../api/tickets.query';

// Mock the useSelector and useTicketsQuery hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../api/tickets.query', () => ({
  useTicketsQuery: jest.fn(),
}));

// Mock the Ticket component to avoid testing its internal behavior
jest.mock('../component/ticket/Ticket', () => ({
  Ticket: () => <div>Ticket component mock</div>,
}));

describe('MyTickets', () => {
  it('renders successfully with tickets', () => {
    // Mock the selector and query hooks
    useSelector.mockReturnValue({ accessToken: 'mock-access-token' });
    useTicketsQuery.mockReturnValue({
      data: [{ id: 1, name: 'Ticket 1' }, { id: 2, name: 'Ticket 2' }],
      isSuccess: true,
    });

    // Render the component
    const { getByText, getAllByText } = render(<MyTickets />);

    // Check if the heading is in the document
    expect(getByText('My Tickets')).toBeInTheDocument();

    // Check if the mock tickets are in the document
    const ticketMocks = getAllByText('Ticket component mock');
    expect(ticketMocks.length).toBe(2);
  });

  it('renders without tickets when query is not successful', () => {
    // Mock the selector and query hooks
    useSelector.mockReturnValue({ accessToken: 'mock-access-token' });
    useTicketsQuery.mockReturnValue({
      data: [],
      isSuccess: false,
    });
  
    // Render the component
    const { getByText, queryByText } = render(<MyTickets />);
  
    // Check if the heading is in the document
    expect(getByText('My Tickets')).toBeInTheDocument();
  
    // There should be no tickets
    expect(queryByText('Ticket component mock')).not.toBeInTheDocument();
  });

  it('renders with empty tickets list when query is successful', () => {
    // Mock the selector and query hooks
    useSelector.mockReturnValue({ accessToken: 'mock-access-token' });
    useTicketsQuery.mockReturnValue({
      data: [],
      isSuccess: true,
    });
  
    // Render the component
    const { getByText, queryByText } = render(<MyTickets />);
  
    // Check if the heading is in the document
    expect(getByText('My Tickets')).toBeInTheDocument();
  
    // There should be no tickets since the array is empty
    expect(queryByText('Ticket component mock')).not.toBeInTheDocument();
  });
});
