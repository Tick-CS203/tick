import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../api/socket.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Queue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.user);
  const [queueNumber, setQueueNumber] = useState(null);

  const enterSession = () => {
    socket.emit("enter_session", {
      type: "CLIENT",
      room: id,
      token: accessToken,
    });
  };

  const exitSession = () => {
    socket.emit("exit_session", {
      type: "CLIENT",
      room: id,
      token: accessToken,
    });
  };

  useEffect(() => {
    function moveInQueue(value) {
      if (value.QueueNo) {
        setQueueNumber(value.Queue)
      }

      if (value.Token) {
        navigate(`/seatmap/${id}`)
      }
    }

    socket.on("foo", moveInQueue);

    return () => {
      socket.off("foo", moveInQueue);
    };
  }, []);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <p className="font-inter font-black text-white italic text-xl py-5 relative uppercase">
        Queue for Event {id}
      </p>
      {queueNumber && <p className="font-inter font-black text-white italic text-xl py-5 relative uppercase">
        Your Queue Number is {queueNumber}
      </p>}
    </>
  );
};
