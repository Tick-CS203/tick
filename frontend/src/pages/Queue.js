import { useParams, useNavigate } from "react-router-dom";
import { socketURL } from "../api/socket.js";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPurchasing } from "../store/userSlice.js";
import { setSocket } from "../store/socketSlice";
import { io } from "socket.io-client";

export const Queue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const [queueNumber, setQueueNumber] = useState(null);
  const { userID } = useSelector((state) => state.user);
  const socket = io(socketURL, {
    query: {
      room: id, // hardcoded eventID
    },
  });

  const enterSession = () => {
    try {
      socket.emit("enter_session", {
        type: "CLIENT",
        room: id,
        token: accessToken,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    function moveInQueue(res) {
      console.log(res);
      if ("queue_no" in res) {
        setQueueNumber(res.queue_no + 1);
        console.log(res.queue_no + 1);
      } else if (res.token) {
        console.log(res.token);
        dispatch(
          setPurchasing({
            purchasingToken: res.token,
          })
        );
        navigate(`/seatmap/${id}`); // comment to stop auto redirect
      }
    }
    console.log(userID);
    socket.on(userID, moveInQueue);
    if (userID) enterSession();

    return () => {
      socket.off(userID);
    };
  }, [userID]);

  useEffect(() => {
    socket.connect();
    dispatch(setSocket(socket));
  }, []);

  return (
    <>
      <p className="font-inter font-black text-white italic text-xl py-5 relative uppercase">
        Queue for Event {id}
      </p>
      {queueNumber && (
        <p className="font-inter font-black text-white italic text-xl py-5 relative uppercase">
          Your Queue Number is {queueNumber}
        </p>
      )}
    </>
  );
};
