import { useEventQuery } from "../api/events.query.js";
import { useParams } from "react-router-dom";
import React from 'react';
import { Link } from 'react-router-dom';

export const EventDetails = () => {
  const { id } = useParams();

  const { data: event, isLoading, isSuccess, isError } = useEventQuery(id);
  console.log(event);

  const formatEventDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <>
      {isLoading && <p className="text-white"> Loading... </p>}

      {isError && <p className="text-white"> Error 404: Event not found </p>}

      {isSuccess && (
        <div className="flex flex-col">
          <img
            className="w-full"
            src={event.banner}
            alt="event banner"
            height="300"
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8">
            <div className="w-full md:w-3/4 pr-8">
              <p className="font-inter font-black text-main-yellow italic text-2xl pt-5 relative">
                {event.name}
              </p>

              <p className="flex items-center pt-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3177/3177361.png"
                  className="inline-block h-4 mr-2"
                  style={{ filter: 'invert(1)' }}
                  alt="Icon"
                />
                <span className="text-white">{event.venueId}</span>
              </p>

              <div className="flex items-center pt-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3416/3416094.png"
                  className="inline-block h-4 mr-2"
                  style={{ filter: 'invert(1)' }}
                  alt="Icon"
                />
                <div className="text-white pl-5">
                  {event.date && event.date.length > 0 ? (
                    event.date.map((eventDate, index) => (
                      <p key={index}>{formatEventDateTime(eventDate.eventDateTime)}</p>
                    ))
                  ) : (
                    "Date not available"
                  )}
                </div>
              </div>

              <p className="font-inter font-black text-main-blue italic text-2xl pt-10 relative">
                ABOUT
              </p>

              <p className="font-inter text-white pt-5 pb-3 relative">
                {event.description}
              </p>

              <p className="font-inter font-black text-main-yellow italic text-2xl pt-10 relative">
                PRICING
              </p>

              {event.prices ? (
                <div className="font-inter text-white pt-5 pb-3 relative">
                  {event.prices.map((priceData, index) => (
                    <p key={index}>{priceData.category} - ${priceData.price}</p>
                  ))}
                </div>
              ) : (
                <p className="font-inter text-white pt-5 pb-3 relative">No pricing information available.</p>
              )}

              <p className="font-inter font-black text-main-red italic text-2xl pt-10 relative">
                EXCHANGE & REFUND POLICY
              </p>

              <p className="font-inter text-white pt-5 pb-3 relative">
                We understand that plans can change. Our exchange and refund policy are designed to provide flexibility to our valued customers. If you find yourself unable to attend an event, you can request an exchange or refund within 3 days of your purchase. Please note that terms and conditions may apply, and certain events may have specific policies. For more details on our exchange and refund process, please refer to our comprehensive policy page.
              </p>

              <p className="font-inter font-black text-main-yellow italic text-2xl pt-10 relative">
                ADMISSION POLICY
              </p>

              <p className="font-inter text-white pt-5 pb-3 relative">
                To gain entry to an event, attendees must present a valid ticket. This ticket can be in the form of a printed physical ticket or a digital e-ticket, as specified during the ticket purchase process. Some events may have age restrictions in place. In such cases, valid proof of age, such as a government-issued ID, may be required for age-restricted events. For the safety of all attendees, we implement security measures, including bag checks and metal detectors, at our events. Outside food, weapons, illegal substances and any other items deemed unsafe or disruptive are prohibited at this event.
              </p>

              <p className="font-inter font-black text-main-blue italic text-2xl pt-10 relative">
                HOW TO BUY TICKETS
              </p>

              <p className="font-inter text-white pt-5 pb-3 relative">
                Click the above "Purchase Tickets" button to proceed to review your ticket and make secure payment. Once the purchase is complete, you'll receive a confirmation email along with your e-tickets.
              </p>
            </div>

            <div className="w-full md:w-1/4 mt-8 md:mt-0">
              <div className="flex flex-col items-start space-y-3" style={{ marginTop: "-500px" }}>
                <Link to={`/seatmap/${id}`} className="bg-main-yellow text-black rounded-full py-2 px-4 w-full flex items-center justify-center">
                  Purchase Tickets
                </Link>

                <button className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-4 w-full">
                  View Seatmap
                </button>

                <button className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-4 w-full">
                  Open in Maps
                </button>

                <button className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-4 w-full">
                  Bookmark Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};



