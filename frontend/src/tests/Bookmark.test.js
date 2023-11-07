import React from 'react';
import { render, screen } from '@testing-library/react';
import { Bookmark } from '../pages/Bookmark';
import { useSelector } from 'react-redux';
import { useBookmarks } from '../api/bookmarks.query';
import { useNavigate } from 'react-router-dom';

// Mock modules
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: ({ children }) => <div>{children}</div>, // Mocked for simplicity
}));
jest.mock('../api/bookmarks.query', () => ({
  useBookmarks: jest.fn(),
}));
jest.mock('../component/bookmarks/BookmarkedEvent', () => ({
  BookmarkedEvent: ({ bookmark }) => <div>Bookmarked Event {bookmark.id}</div>,
}));

// Utility function to set up the test environment
const setup = (bookmarks) => {
  useSelector.mockImplementation((selector) => selector({
    user: { accessToken: 'fake-access-token' }
  }));
  useNavigate.mockImplementation(() => jest.fn());
  useBookmarks.mockImplementation(() => ({ data: bookmarks }));
  render(<Bookmark />);
};

describe('Bookmark', () => {
  it('renders bookmarked events when bookmarks are present', () => {
    setup({ eventList: [{ id: 1 }, { id: 2 }] }); // Mock bookmarks with items

    expect(screen.getByText('My Bookmarks')).toBeInTheDocument();
    expect(screen.getByText('Bookmarked Event 1')).toBeInTheDocument();
    expect(screen.getByText('Bookmarked Event 2')).toBeInTheDocument();
  });

  it('renders a message when there are no bookmarks', () => {
    setup({ eventList: [] }); // Mock bookmarks with no items

    expect(screen.getByText('My Bookmarks')).toBeInTheDocument();
    expect(screen.getByText(/You don't appear to have any bookmarks currently, head over to/)).toBeInTheDocument();
    expect(screen.getByText(/All Events/)).toBeInTheDocument();    
  });
});
