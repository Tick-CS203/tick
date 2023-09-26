import { useEventQuery } from "../api/events.query.js";
import { useParams } from "react-router-dom";

<script
  src="https://kit.fontawesome.com/12bbdb3ccf.js"
  crossorigin="anonymous"
></script>;

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

      {isError && <p className="text-white"> Error 404 : Event not found </p>}

      {isSuccess && (
        <>
          <img
            className="flex justify-center"
            src={event.banner}
            alt="event banner"
            width="1920"
            height="768"
          ></img>

          <p className="font-inter font-black text-main-yellow italic text-2xl pt-5 relative">
            {event.name}
          </p>

          <div>
            <svg
              className="inline-block"
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="20"
              height="40"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              ></path>
            </svg>
            <span className="text-white pl-5">{event.venueId}</span>
          </div>

          <p>
            <img src="https://www.flaticon.com/free-icon/pin_3177361?term=location&page=1&position=9&origin=search&related_id=3177361" className="inline-block h-4 mr-2" />
          </p>

          <div>
            <span className="text-white pl-5">{event.venueID}</span>
          </div>

          <div className="flex">
            <div className="flex items-center">
              <svg
                className="inline-block"
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width="20"
                height="40"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                ></path>
              </svg>

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

            <div className="flex flex-col items-start ml-auto space-y-3">
              <button className="bg-main-yellow text-black rounded-full py-2 px-4 w-full">
                Purchase Tickets
              </button>

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

        </>
      )
      }
    </>
  );
};
