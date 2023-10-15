import React from "react";
import "../component/ticket/TicketDetails.css";
import { useTicketsQuery } from "../api/tickets.query";
import TicketFlip from "../component/ticket/TicketFlip";

// Header Component
const TicketHeader = ({ title }) => (
  <h1 className="text-white font-extrabold text-3xl mb-4 font-inter italic">
    {title}
  </h1>
);

// Order Details Component
const OrderDetails = ({ orderId, orderDateTime }) => (
  <div className="flex flex-col font-inter">
    <p className="text-white font-semibold text-sm">Order ID: {orderId}</p>
    <p className="text-white font-semibold text-sm">
      Order DateTime: {orderDateTime}
    </p>
  </div>
);

// Ticket Menu Component
const TicketMenu = () => {
  return (
    <div
      className="ticket-menu h-full flex flex-col justify-between font-inter"
      style={{ marginLeft: "20px" }}
    >
      <button className="menu-button inverted-button h-full font-bold px-10">
        My QR Code
      </button>
      <button className="menu-button text-main-yellow border-2 border-main-yellow h-full font-bold px-10">
        Download
      </button>
      <button className="menu-button text-main-yellow border-2 border-main-yellow h-full font-bold px-10">
        Event Details
      </button>
      <button className="menu-button text-main-yellow border-2 border-main-yellow h-full font-bold px-10">
        Transfer Ticket
      </button>
    </div>
  );
};

// Ticket Details Component
const TicketDetails = ({
  imageUrl,
  eventName,
  location,
  time,
  day,
  date,
  month,
  year,
}) => {
  return (
    <div className="ticket-container bg-white shadow-md rounded-2xl flex relative font-inter">
      {/* Image Section */}
      <div className="ticket-image-container">
        <img src={imageUrl} alt="Band" className="h-full object-cover" />
      </div>
      {/* Details Section */}
      <div className="ticket-details-container-top p-6 flex flex-row">
        <h1 className="ticket-name text-xl font-bold font-lemon">
          {eventName}
        </h1>
        <div className="text-container">
          <div className="text-left">
            <p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/535/535239.png"
                alt="Location"
                className="inline-block h-4 mr-2"
              />
              <span className="text-sm">{location}</span>
            </p>
            <p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3114/3114812.png"
                alt="Time"
                className="inline-block h-4 mr-2"
              />
              <span className="text-sm">{time}</span>
            </p>
          </div>
          <div className="text-right">
            <p>{day}</p>
            <p className="text-4xl font-bold">{date}</p>
            <p>{`${month} ${year}`}</p>
          </div>
        </div>
      </div>
      {/* Admit One Section */}
      <div className="details-section-right flex">
        <div className="grey-dotted-line"></div>
        <div className="test-text-container">
          <h3 className="test-text">ADMIT ONE</h3>
        </div>
        <div className="semi-circle-container">
          <div className="semi-circle"></div>
        </div>
      </div>
    </div>
  );
};

// Main Ticket Component
export const Ticket = ({ background }) => {
  // const { data: ticketData } = useTicketsQuery(
  //   "e96a053c-e0f1-70b9-a432-97fde72597e4"
  // );
  // console.log(ticketData);
  const tickets = [
    {
      imageUrl:
        "https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg",
      eventName:
        "ATEEZ WORLD TOUR (THE FELLOWSHIP: BREAK THE WALL) IN SINGAPORE 2023",
      location: "Singapore Indoor Stadium",
      time: "19:30 SGT - 23:00 SGT",
      day: "Friday",
      date: "15",
      month: "November",
      year: "2023",
      orderId: "1234567890",
      orderDateTime: "2023-09-17 12:00:00",
    },
    {
      imageUrl:
        "https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg",
      eventName:
        "ATEEZ WORLD TOUR (THE FELLOWSHIP: BREAK THE WALL) IN SINGAPORE 2023",
      location: "Singapore Indoor Stadium",
      time: "19:30 SGT - 23:00 SGT",
      day: "Friday",
      date: "15",
      month: "November",
      year: "2023",
      orderId: "1234567890",
      orderDateTime: "2023-09-17 12:00:00",
    },
    {
      imageUrl:
        "https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg",
      eventName:
        "ATEEZ WORLD TOUR (THE FELLOWSHIP: BREAK THE WALL) IN SINGAPORE 2023",
      location: "Singapore Indoor Stadium",
      time: "19:30 SGT - 23:00 SGT",
      day: "Friday",
      date: "15",
      month: "November",
      year: "2023",
      orderId: "1234567890",
      orderDateTime: "2023-09-17 12:00:00",
    },
  ];

  return (
    <div className={`bg-${background} p-4`}>
      <TicketHeader title="My Tickets" />
      {tickets.map((ticket, index) => (
        <div className="ticket-block mb-12" key={index}>
          <div style={{ marginBottom: '20px' }}>
            <OrderDetails
              orderId={ticket.orderId}
              orderDateTime={ticket.orderDateTime}
            />
          </div>
          <div className="flex items-stretch">
            <TicketFlip ticket={ticket} /> {}
            <TicketMenu />
          </div>
        </div>
      ))}
    </div>
  );

};

export default Ticket;
export {TicketDetails};
