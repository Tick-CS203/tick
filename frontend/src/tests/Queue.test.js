import React from 'react';
import { render } from '@testing-library/react';
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

  it('renders without crashing and handles socket events correctly', () => {
    reactRedux.useSelector.mockImplementation(callback => callback({
      user: {
        accessToken: 'mockAccessToken',
        userID: 'mockUserID',
      },
    }));
    reactRouterDom.useParams.mockReturnValue({ id: 'mockId' });
    render(<Queue />);

    // Simulate a socket event that should update the queue number
    const moveInQueueResponse = { queue_no: 1 };
    const moveInQueue = socket.on.mock.calls[0][1];
    moveInQueue(moveInQueueResponse); // Simulate a socket event being received

    // Simulate a socket event that should trigger navigation
    const navigateResponse = { token: 'mockPurchasingToken' };
    moveInQueue(navigateResponse); // Simulate a socket event being received
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(`/seatmap/mockId`);

    // Simulate a socket event with an error
    const errorResponse = { error: 'Some error occurred' };
    moveInQueue(errorResponse); // Simulate a socket event being received with an error
    // Here you would expect some error handling to have been called, such as logging the error.
  });

  it('does not call enterSession if userID is not present', () => {
    reactRedux.useSelector.mockImplementation(callback => callback({
      user: {
        accessToken: 'mockAccessToken',
        userID: '', // No userID present
      },
    }));
    reactRouterDom.useParams.mockReturnValue({ id: 'mockId' });
    render(<Queue />);

    expect(socket.emit).not.toHaveBeenCalledWith("enter_session", expect.anything());
  });

  // Further tests could be added to simulate and assert behavior when socket emits different messages
});
