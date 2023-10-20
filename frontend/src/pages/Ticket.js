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

function calculateStandingTime(time) {
  // Clean the time string by removing "SGT"
  const cleanedTime = time.replace("SGT", "").trim();

  // Split the cleaned time string into start and end times
  const [startTime] = cleanedTime.split(" - ");
  const [startHour, startMinute] = startTime.split(":").map(Number);

  // Calculate standing time
  let standingHour = startHour - 3;
  let standingMinute = startMinute;

  if (standingMinute < 0) {
    standingHour -= 1;
    standingMinute += 60;
  }

  if (standingHour < 0) {
    standingHour += 24;
  }

  // Convert to 12-hour clock representation
  const standingTime = convertTo12HourClock(standingHour, standingMinute);
  return standingTime;
}

function calculateSeatingTime(time) {
  const cleanedTime = time.replace("SGT", "").trim();

  const [startTime] = cleanedTime.split(" - ");
  const [startHour, startMinute] = startTime.split(":").map(Number);

  let seatingHour = startHour - 2;
  let seatingMinute = startMinute;

  if (seatingMinute < 0) {
    seatingHour -= 1;
    seatingMinute += 60;
  }

  if (seatingHour < 0) {
    seatingHour += 24;
  }

  const seatingTime = convertTo12HourClock(seatingHour, seatingMinute);
  return seatingTime;
}

function convertTo12HourClock(hour, minute) {
  // Determine AM or PM based on the hour
  const period = hour < 12 ? "AM" : "PM";

  // Convert hour to 12-hour format
  const formattedHour = (hour % 12) || 12; // Ensure 12:00 remains as 12:00

  // Format the time as 'hh:mm AM/PM'
  return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
}

const TicketDetailsBack = ({
  imageUrl,
  eventName,
  location,
  time,
  day,
  date,
  month,
  year,
}) => {
  const seatingTime = calculateSeatingTime(time);
  const standingTime = calculateStandingTime(time);
  return (
    <div className="ticket-container bg-white shadow-md rounded-2xl flex relative font-inter">
      <div className="ticket-details-container-top p-10 flex flex-row">
        <div className="text-container d-flex justify-content-center">
          <div className="text-center">
            <p>
              Standing: Gates open at {standingTime}
              <br />
              Seated: Gates open at {seatingTime}
            </p>
          </div>
          <div className="text-right text-center">
            <p>
              Do arrive early for security checks
              <br />
              No re-entry
              <br />
              No photography & videography allowed
              <br />
              No admission for children aged below 12 for Standing
              <br />
              No admission for children aged below 3 for Seated
            </p>
          </div>
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

  const backOfTickets = [
    {
      imageUrl:
        "https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg",
      eventName:
        "THIS IS THE BACK OF THE TICKET",
      location: "Singapore Indoor Stadium",
      time: "19:30 SGT - 23:00 SGT",
      day: "Friday",
      date: "20",
      month: "November",
      year: "2023",
      orderId: "1234567890",
      orderDateTime: "2023-09-17 12:00:00",
    },
    {
      imageUrl:
        "https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg",
      eventName:
        "THIS IS THE BACK OF THE TICKET",
      location: "Singapore Indoor Stadium",
      time: "19:30 SGT - 23:00 SGT",
      day: "Friday",
      date: "20",
      month: "November",
      year: "2023",
      orderId: "1234567890",
      orderDateTime: "2023-09-17 12:00:00",
    },
    {
      imageUrl:
        "https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg",
      eventName:
        "THIS IS THE BACK OF THE TICKET",
      location: "Singapore Indoor Stadium",
      time: "19:30 SGT - 23:00 SGT",
      day: "Friday",
      date: "20",
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
            <TicketFlip ticket={ticket} backOfTicket={backOfTickets[index]} /> { }
            <TicketMenu />
          </div>
        </div>
      ))}
    </div>
  );

};

export default Ticket;
export { TicketDetails, TicketDetailsBack };
