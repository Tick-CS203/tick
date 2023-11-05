import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { axiosInstance } from "../api/axios";
import { useEffect } from "react";

export const PaymentSuccess = () => {
  const { purchasingToken } = useSelector((state) => state.user);
  const { eventID, eventDateID, items } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  if (eventID.length === 0 || eventDateID.length === 0) {
    toast.error("Error creating tickets");
  }

  useEffect(() => {
    const allocateTickets = async () => {
      if (eventID && eventDateID && items && purchasingToken) {
        const response = await axiosInstance.post(
          `/tickets/allocate/${eventID}/${eventDateID}`,
         items,
          {
            headers: {
              Authorization: purchasingToken,
            },
          }
        );
        if (response.status === 200) {
            toast.success("Tickets successfully allocated")
            navigate("/ticket")
        }
      }
    };

    allocateTickets();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="font-inter font-black text-white italic text-2xl uppercase text-center">
        PROCESSING PAYMENT
      </p>
      {/* <p className="text-white">{eventID}</p>
      <p className="text-white">{purchasingToken}</p>
      <p className="text-white">{eventDateID}</p>
      {items.map((item) => {
        return (
          <div
            className="text-main-yellow py-5"
            key={`${item.category}:${item.section}:${item.row}`}
          >
            <p className="py-1">{item.category}</p>
            <p className="py-1">{item.section}</p>
            <p className="py-1">{item.row}</p>
            <p className="py-1">{item.quantity}</p>
          </div>
        );
      })} */}
      <Spin size="large" />
    </div>
  );
};
