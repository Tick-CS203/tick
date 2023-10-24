import React from 'react';
import '../component/ticket/TicketDetails.css';

// TicketHeader Component for displaying the title
// Props: title - The title to be displayed
const TicketHeader = ({ title }) => (
  <h1 className="text-white font-extrabold text-3xl mb-4 font-inter italic">{title}</h1>
);

// OrderDetails Component for displaying order information
// Props: orderId - ID of the order
//        orderDateTime - Date and time the order was placed
const OrderDetails = ({ orderId, orderDateTime }) => (
  <div className="flex flex-col font-inter">
    <p className="text-white font-semibold text-sm">Order ID: {orderId}</p>
    <p className="text-white font-semibold text-sm">Order DateTime: {orderDateTime}</p>
  </div>
);

// TicketMenu Component for displaying the ticket menu options
const TicketMenu = () => {
    return (
        <div className="ticket-menu h-full flex flex-col justify-between font-inter" style={{ marginLeft: '20px' }}>
        <button className="menu-button inverted-button h-full font-bold px-10">My QR Code</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full font-bold px-10">Download</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full font-bold px-10">Event Details</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full font-bold px-10">Transfer Ticket</button>
      </div>
    );
};

// TicketDetails Component for displaying detailed ticket information
// Props: imageUrl - URL of the event image
//        eventName - Name of the event
//        ...other event details
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
          <h1 className="ticket-name text-xl font-bold font-lemon">{eventName}</h1>
          <div className="text-container">
              <div className="text-left">
                  <p>
                    <img src="https://cdn-icons-png.flaticon.com/128/535/535239.png" alt="Location" className="inline-block h-4 mr-2" />
                    <span className="text-sm">{location}</span>
                  </p>
                  <p>
                    <img src="https://cdn-icons-png.flaticon.com/128/3114/3114812.png" alt="Time" className="inline-block h-4 mr-2" />
                    <span className="text-sm">{time}</span>
                  </p>
              </div>
              <div className="text-right">
                <p>{day}</p>
                <p className="text-4xl font-bold">{date}</p>
                <p>{`${month} ${year}`}</p>
            </div>
            {/* TicketMenu Mobile Section */}
            <div className="ticket-menu-mobile">
                <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" alt="QR Code" className="qr-code"/>
                <div className="menu-links">
                    <a href="#download-link" className="menu-link">Download</a>
                    <a href="#event-details-link" className="menu-link">Event Details</a>
                    <a href="#transfer-ticket-link" className="menu-link">Transfer Ticket</a>
                </div>
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
    // Sample ticket data (to be updated with real data)
    const tickets = [
      {
        imageUrl: "https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg",
        eventName: "ATEEZ WORLD TOUR (THE FELLOWSHIP: BREAK THE WALL)",
        location: "Singapore Indoor Stadium",
        time: "19:30 SGT - 23:00 SGT",
        day: "Friday",
        date: "15",
        month: "November",
        year: "2023",
        orderId: "1234567890",
        orderDateTime: "2023-09-17 12:00:00"
      },
      {
        imageUrl: "https://fluxmusic.cdn.radiosphere.io/images/4d0cf9f1-28e0-46ae-9360-d4ebcce6b98e?type=large",
        eventName: "COLDPLAY MUSIC OF THE SPHERES WORLD TOUR 2024",
        location: "National Stadium, Singapore",
        time: "8:00 PM SGT",
        day: "Thursday",
        date: "27",
        month: "January",
        year: "2024",
        orderId: "1234567890",
        orderDateTime: "2023-09-25 17:11:23"
      },
      {
        imageUrl: "https://i.imgur.com/zoFP66P.png",
        eventName: "NBA FINALS 2023 - GOLDEN STATE WARRIORS @ BOSTON CELTICS",
        location: "Ball Arena, Denver, Colorado",
        time: "8:30 PM ET",
        day: "Thursday",
        date: "15",
        month: "June",
        year: "2023",
        orderId: "1234567890",
        orderDateTime: "2023-09-25 17:04:18"
      },
    ];
  
    return (
        <div className={`bg-${background} p-4`}>
            {/* Displaying TicketHeader component */}
            <TicketHeader title="My Tickets" />
            {/* Mapping through the tickets array and displaying each ticket */}
            {tickets.map((ticket, index) => (
                <div className="ticket-block mb-12" key={index}>
                <div style={{ marginBottom: '20px' }}>
                    {/* Displaying OrderDetails component */}
                    <OrderDetails orderId={ticket.orderId} orderDateTime={ticket.orderDateTime} />
                </div>
                <div className="flex items-stretch">
                    {/* Displaying TicketDetails and TicketMenu components */}
                    <TicketDetails {...ticket} />
                    <TicketMenu />
                </div>
            </div>
// {tickets.map((ticket, index) => (
//     <div className="ticket-block mb-12" key={index}>
//         <div style={{ marginBottom: '20px' }}>
//             <OrderDetails orderId={ticket.orderId} orderDateTime={ticket.orderDateTime} />
//         </div>
//         <div className="ticket-container">
//             <TicketDetails {...ticket} />
//             <TicketMenu />
//         </div>
//     </div>
// ))}
          ))}
        </div>
      );
    };
  
  export default Ticket;