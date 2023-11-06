import { io } from "socket.io-client";

export const socket = io("ws://" + process.env.REACT_APP_BACKEND_HOST, {
  query: {
    room: "0", // hardcoded eventID
  },
});
