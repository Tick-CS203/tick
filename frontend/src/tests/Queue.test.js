import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { Queue } from '../pages/Queue';
import * as reactRedux from 'react-redux';
import * as reactRouterDom from 'react-router-dom';
import { socket } from '../api/socket';

// Mocking useParams and useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mocking useDispatch and useSelector from react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the socket from "../api/socket.js"
jest.mock('../api/socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  },
}));

describe('Queue Component', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    reactRouterDom.useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing and handles socket events correctly', async () => {
    reactRedux.useSelector.mockImplementation(callback => callback({
      user: {
        accessToken: 'mockAccessToken',
        userID: 'mockUserID',
      },
    }));
    reactRouterDom.useParams.mockReturnValue({ id: 'mockId' });

    // Wrap the render method in act to ensure all effects are flushed
    await act(async () => {
      render(<Queue />);
    });

    // Assuming the socket.on method is called immediately when the component mounts
    const moveInQueue = socket.on.mock.calls[0][1];

    // Use act for state updates and wrap assertions in waitFor
    // Simulate a socket event being received
    await act(async () => {
      moveInQueue({ queue_no: 1 });
    });

    // Use act and waitFor for the navigation event as well
    // Simulate a socket event being received
    await act(async () => {
      moveInQueue({ token: 'mockPurchasingToken' });
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(`/seatmap/mockId`);
    });
  });

  it('does not call enterSession if userID is not present', async () => {
    reactRedux.useSelector.mockImplementation(callback => callback({
      user: {
        accessToken: 'mockAccessToken',
        userID: '',
      },
    }));
    reactRouterDom.useParams.mockReturnValue({ id: 'mockId' });

    await act(async () => {
      render(<Queue />);
    });

    expect(socket.emit).not.toHaveBeenCalledWith("enter_session", expect.anything());
  });
});