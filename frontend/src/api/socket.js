import { io } from "socket.io-client";

export const socket = io(
  "ws://service-alb-832968326.ap-southeast-1.elb.amazonaws.com/",
  {
    query: {
      room: "eventID1",
    },
  }
);
