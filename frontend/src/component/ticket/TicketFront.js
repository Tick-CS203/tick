import { useState } from 'react';

const venueName = "Singapore Indoor Stadium";

export const TicketFront = ({ ticketData, eventData }) => {

  // need to match eventDateID with ticket eventDateID
  const [eventDateTime, setEventDateTime] = useState(new Date("2023-09-22T14:41:23.497"));

  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const DAYS = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  return (
    <div className="relative w-full h-[200px] bg-white shadow-md flex flex-row font-inter">
      
      {/* Semicircle */}
      <div className="flex justify-center items-center relative">
        <div className="w-[20px] h-[40px] bg-black rounded-full rounded-tl-none rounded-bl-none absolute left-0 top-1/2 transform -translate-y-1/2"></div>
      </div>

      {/* Image Section */}
      {eventData && (
        <div className="flex-none w-[400px] overflow-hidden">
          <img src={eventData.banner} alt="Band" className="object-cover" />
        </div>
      )}

      {/* Details Section */}
      <div className="w-full p-6">
        {eventData && (
          <h1 className="text-xl font-bold font-lemon text-black">
            {eventData.name}
          </h1>
        )}
        <div className="flex flex-row justify-between p-0">
          <div className="flex flex-col">
            <p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/535/535239.png"
                alt="Location"
                className="inline-block h-4 mr-2"
              />
              <span className="text-sm text-black">{venueName}</span>
            </p>
            <p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3114/3114812.png"
                alt="Time"
                className="inline-block h-4 mr-2"
              />
              {eventData && <span className="text-sm text-black">time</span>}
            </p>
          </div>
          {eventData && (
            <div className="flex flex-col items-end">
              <p className="text-black">{DAYS[eventDateTime.getDay()]}</p>
              <p className="text-4xl font-bold text-black">
              {eventDateTime.getDate()}
              </p>
              <p className="text-black">{`${MONTHS[eventDateTime.getMonth()]} ${eventDateTime.getFullYear()}`}</p>
            </div>
          )}
        </div>
      </div>

      {/* Admit One Section */}
      <div className="flex justify-center items-center relative">

        {/* Grey Dotted Line */}
        <div className="h-full border-l border-dashed border-gray-500"></div>

        {/* Admit One */}
        <div className="flex justify-center items-center w-[35px]">
          <h3 className="whitespace-nowrap transform rotate-90 text-gray-500 text-xs">ADMIT ONE</h3>
        </div>

        {/* Semicircle */}
        <div className="flex justify-center items-center w-[20px]">
          <div className="w-[20px] h-[40px] bg-black rounded-full rounded-tr-none rounded-br-none absolute right-0 top-1/2 transform -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};
