// MyTickets.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyTickets } from './MyTickets';

// Directly mock the modules
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({ accessToken: 'fake-token' }),
}));
jest.mock('../api/tickets.query', () => ({
  useTicketsQuery: jest.fn().mockReturnValue({ data: [], isSuccess: false }),
}));

// Dummy component for mocking Ticket component
jest.mock('../component/ticket/Ticket', () => ({ ticketData }) => <div>{ticketData.title}</div>);

describe('MyTickets', () => {
  it('renders without tickets if isSuccess is false', () => {
    render(<MyTickets />);
    expect(screen.queryByText(/Ticket \d+/)).toBeNull();
  });

  it('renders tickets if isSuccess is true', () => {
    // Override the mock for this specific test
    require('../api/tickets.query').useTicketsQuery.mockReturnValue({
      data: [{ id: 1, title: 'Ticket 1' }, { id: 2, title: 'Ticket 2' }],
      isSuccess: true,
    });

    render(<MyTickets />);

    expect(screen.getByText('Ticket 1')).toBeInTheDocument();
    expect(screen.getByText('Ticket 2')).toBeInTheDocument();
  });
});
