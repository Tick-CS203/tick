import React from 'react';
import '../component/ticket/TicketDetails.css';

// Header Component
const TicketHeader = ({ title }) => (
  <h1 className="text-white font-extrabold text-3xl mb-4 font-inter italic">{title}</h1>
);

// Order Details Component
const OrderDetails = ({ orderId, orderDateTime }) => (
  <div className="flex flex-col font-inter">
    <p className="text-white font-semibold text-sm">Order ID: {orderId}</p>
    <p className="text-white font-semibold text-sm">Order DateTime: {orderDateTime}</p>
  </div>
);

// Ticket Menu Component
const TicketMenu = () => {
    return (
      <div className="ticket-menu h-full flex flex-col justify-between font-inter">
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">My QR Code</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">Download</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">Event Details</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">Transfer Ticket to another</button>
      </div>
    );
};


// Ticket Details Component
const TicketDetails = ({ orderId, orderDateTime }) => {
    return (
      <div className="ticket-container bg-white shadow-md rounded-lg flex relative font-inter">
        {/* Image Section */}
        <div className="ticket-image-container">
          <img src={"https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg"} alt="Band" className="h-full object-cover" />
        </div>
        {/* Details Section */}
        <div className="ticket-details-container-top p-4 flex flex-row">
          <h1 className="ticket-name text-xl font-bold font-lemon">ATEEZ WORLD TOUR (THE FELLOWSHIP: BREAK THE WALL) IN SINGAPORE 2023</h1>
          <div class="text-container">
              <div class="text-left">
                  <p>
                    <img src="https://cdn-icons-png.flaticon.com/128/535/535239.png" alt="Location" className="inline-block h-4 mr-2" />
                    <span className="text-sm">Singapore Indoor Stadium</span>
                  </p>
                  <p>
                    <img src="https://cdn-icons-png.flaticon.com/128/3114/3114812.png" alt="Time" className="inline-block h-4 mr-2" />
                    <span className="text-sm">Time</span>
                  </p>
              </div>
              <div class="text-right">
                <p>Friday</p>
                <p className="text-4xl font-bold">15</p>
                <p>November 2023</p>
            </div>
          </div>
        </div>
        {/* <div className="details-section-right flex">
            <div className="grey-dotted-line"></div>
            <h3 className="test-text -rotate--270">admit one</h3>
        </div>
        <div className="semi-circle"></div> */}
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
    return (
      <div className={`bg-${background} p-4`}>
        <header className="flex flex-col justify-between">
          <TicketHeader title="My Tickets" />
          <OrderDetails orderId="1234567890" orderDateTime="2023-09-17 12:00:00" />
        </header>
        <div className="flex items-stretch"> {/* Added items-stretch for alignment */}
          <TicketDetails />
          <TicketMenu />
        </div>
        
      </div>
    );
  };
  
export default Ticket;





