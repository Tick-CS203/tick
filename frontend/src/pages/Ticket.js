import React from 'react';
import '../component/ticket/TicketDetails.css';

// Header Component
const TicketHeader = ({ title }) => (
  <h1 className="text-white font-bold text-2xl mb-4">{title}</h1>
);

// Order Details Component
const OrderDetails = ({ orderId, orderDateTime }) => (
  <div className="flex flex-col">
    <p className="text-white font-semibold text-sm">Order ID: {orderId}</p>
    <p className="text-white font-semibold text-sm">Order DateTime: {orderDateTime}</p>
  </div>
);

// Ticket Menu Component
const TicketMenu = () => {
    return (
      <div className="ticket-menu h-full flex flex-col justify-between">
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">My QR Code</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">Download</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">Event Details</button>
        <button className="menu-button text-main-yellow border-2 border-main-yellow h-full">Transfer Ticket to Another</button>
      </div>
    );
};


// Ticket Details Component
const TicketDetails = ({ orderId, orderDateTime }) => {
    return (
      <div className="ticket-container bg-white shadow-md rounded-lg flex relative">
        {/* Image Section */}
        <div className="ticket-image-container">
          <img src={"https://visitglendale.com/wp-content/uploads/2022/09/ateez.jpg"} alt="Band" className="h-full object-cover" />
        </div>
        {/* Details Section */}
        <div className="ticket-details-container-top p-4 flex flex-row">
          <h1 className="ticket-name text-xl font-bold">My Ticket</h1>
          <div class="text-container">
              <div class="text-left">
                  <p>Singapore Indoor Stadium</p>
                  <p>Time</p>
              </div>
              <div class="text-right">
                  <p>Day</p>
                  <p>Date</p>
                  <p>Month and Year</p>
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
                <h3 className="test-text">admit one</h3>
            </div>
            <div className="semi-circle"></div>
        </div>
      </div>
    );
  };
  

// Main Ticket Component
export const Ticket = ({ background }) => {
    return (
      <div className={`bg-${background} p-4`}>
        <header className="flex flex-col justify-between">
          <TicketHeader title="My Ticket" />
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





