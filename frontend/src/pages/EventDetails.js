import {
  useEventQuery,
  useRecommendedEventsQuery,
} from "../api/events.query.js";
import { useVenueQuery } from "../api/venue.query.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addBookmark } from "../service/bookmarks.service"

import { Event } from "../component/homepage/Event.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./countdown.css";
import { Modal } from "antd";
import SeatMapImage from "../assets/taylor-seating-map.jpeg";
import toast from "react-hot-toast";

export const EventDetails = () => {
  const { id } = useParams();
  const [showSeatMap, setShowSeatMap] = useState(false);

  const { data: event, isLoading, isSuccess, isError } = useEventQuery(id);
  const { data: recommendedEvents } = useRecommendedEventsQuery(event?.artist);
  const { accessToken } = useSelector((state) => state.user)

  const { data: venueData } = useVenueQuery(event?.venueID);
  console.log(venueData);

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

  const calculateTimeRemaining = () => {
    const eventStartTime = new Date(event.date[0].eventDateTime).getTime();
    const currentTime = new Date().getTime();
    const timeRemaining = eventStartTime - currentTime;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const navigate = useNavigate()
  const createBookmark = async (button) => {
    addBookmark(accessToken, id, navigate)
    const target = button.target
    target.classList.add("text-[#000000]", "bg-yellow-500")
    toast.success(
      <div className="flex space-x-2">
        <p className="text-stone-900">Bookmark added!</p>
        <Link
          className="text-blue-800 underline"
          onClick={() => {toast.dismiss()}}
          to="/bookmarks">View</Link>
      </div>, {
      duration: 4000
    }
    )
    target.innerHTML = "Added!"
  }

  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (event) {
      const interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <>
      <Modal
        footer={null}
        title="Venue Seatmap"
        open={showSeatMap}
        onOk={() => setShowSeatMap(false)}
        onCancel={() => setShowSeatMap(false)}
      >
        <img src={SeatMapImage} alt="seatMap" />
      </Modal>
      {isLoading && <p className="text-white"> Loading... </p>}

      {isError && <p className="text-white"> Error 404: Event not found </p>}

      {isSuccess && (
        <div className="relative">
          <img
            className="absolute left-[-32px] top-1/3 hidden lg:block"
            src="data:image/png;base64,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"
            alt="guitar"
          />
          <div className="flex justify-center">
            <img className="max-h-2/6" src={event.banner} alt="event banner" />
          </div>
          <div className="flex lg:flex-row flex-col lg:px-32 gap-x-10 max-w-5/6">
            <div className="lg:w-10/12 w-full flex flex-col justify-between">
              <div className="pb-5">
                <p className="font-inter font-black text-white italic text-3xl pt-5">
                  {event.name}
                </p>
                <p className="flex items-center pt-5 opacity-80">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3177/3177361.png"
                    className="inline-block h-4 mr-2"
                    style={{ filter: "invert(1)" }}
                    alt="Icon"
                  />
                  {venueData && (
                    <span className="text-white pl-5 font-semibold">
                      {venueData.name}
                    </span>
                  )}
                </p>
                <div className="flex items-center lg:pt-5 pt-2 opacity-80">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3416/3416094.png"
                    className="inline-block h-4 mr-2"
                    style={{ filter: "invert(1)" }}
                    alt="Icon"
                  />
                  <span className="text-white pl-5 font-semibold">
                    {event.date && event.date.length > 0
                      ? event.date.map((eventDate, index) => (
                        <span key={index}>
                          {formatEventDateTime(eventDate.eventDateTime)}
                        </span>
                      ))
                      : "Date not available"}
                  </span>
                </div>
              </div>

              {timeRemaining && timeRemaining > 0 && (
                <div className="py-5">
                  <p className="font-inter font-black text-white text-s py-5">
                    Event starts in:
                  </p>

                  <div class="countdowntimer">
                    <div class="box">
                      <span class="num" id="day-box">
                        {timeRemaining.days.toString().padStart(2, "0")}
                      </span>
                      <span class="text">DAYS</span>
                    </div>
                    <div class="box">
                      <span class="num" id="hr-box">
                        {timeRemaining.hours.toString().padStart(2, "0")}
                      </span>
                      <span class="text">HOURS</span>
                    </div>
                    <div class="box">
                      <span class="num" id="min-box">
                        {timeRemaining.minutes.toString().padStart(2, "0")}
                      </span>
                      <span class="text">MINUTES</span>
                    </div>
                    <div class="box">
                      <span class="num" id="sec-box">
                        {timeRemaining.seconds.toString().padStart(2, "0")}
                      </span>
                      <span class="text">SECONDS</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="py-5">
                <p className="font-inter font-black text-main-blue italic text-2xl">
                  ABOUT
                </p>

                <p className="font-inter text-white pt-5">
                  {event.description}
                </p>
              </div>

              <div className="py-5">
                <p className="font-inter font-black text-main-yellow italic text-2xl">
                  PRICING
                </p>

                {event.prices ? (
                  <div className="font-inter text-white pt-5">
                    {event.prices.map((priceData, index) => (
                      <p key={index}>
                        {priceData.category} - ${priceData.price}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="font-inter text-white pt-5">
                    No pricing information available.
                  </p>
                )}
              </div>

              <div className="py-5">
                <p className="font-inter font-black text-main-red italic text-2xl">
                  EXCHANGE & REFUND POLICY
                </p>

                <p className="font-inter text-white pt-5">
                  We understand that plans can change. Our exchange and refund
                  policy are designed to provide flexibility to our valued
                  customers. If you find yourself unable to attend an event, you
                  can request an exchange or refund within 3 days of your
                  purchase. Please note that terms and conditions may apply, and
                  certain events may have specific policies. For more details on
                  our exchange and refund process, please refer to our
                  comprehensive policy page.
                </p>
              </div>

              <div className="py-5">
                <p className="font-inter font-black text-main-yellow italic text-2xl">
                  ADMISSION POLICY
                </p>

                <p className="font-inter text-white pt-5">
                  To gain entry to an event, attendees must present a valid
                  ticket. This ticket can be in the form of a printed physical
                  ticket or a digital e-ticket, as specified during the ticket
                  purchase process. Some events may have age restrictions in
                  place. In such cases, valid proof of age, such as a
                  government-issued ID, may be required for age-restricted
                  events. For the safety of all attendees, we implement security
                  measures, including bag checks and metal detectors, at our
                  events. Outside food, weapons, illegal substances and any
                  other items deemed unsafe or disruptive are prohibited at this
                  event.
                </p>
              </div>

              <div className="py-5">
                <p className="font-inter font-black text-main-blue italic text-2xl">
                  HOW TO BUY TICKETS
                </p>

                <p className="font-inter text-white pt-5">
                  Click the above "Purchase Tickets" button to proceed to review
                  your ticket and make secure payment. Once the purchase is
                  complete, you'll receive a confirmation email along with your
                  e-tickets.
                </p>
              </div>
              {recommendedEvents && recommendedEvents.length > 0 && (
                <div className="py-5">
                  <p className="font-inter font-black text-white italic text-2xl">
                    RECOMMENDATIONS BASED ON SIMILAR ARTISTS
                  </p>

                  <div className="flex flex-row gap-4 pt-5 overflow-x-auto">
                    {recommendedEvents.map((event) => {
                      return (
                        <Event
                          key={event.eventID}
                          eventId={event.eventID}
                          imageURL={event.banner}
                          eventName={event.name}
                          eventDates={event.date}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-5 lg:w-2/12 w-full min-w-fit flex flex-col items-start space-y-3">
              <Link
                to={`/queue/${id}`}
                className="bg-main-yellow text-black rounded-full py-2 px-4 w-full flex items-center justify-center"
              >
                Purchase Tickets
              </Link>

              <button
                className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-8 w-full"
                onClick={() => setShowSeatMap(true)}
              >
                View Seatmap
              </button>

              {venueData && (
                <a
                  className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-8 w-full text-center"
                  href={"http://maps.google.com/?q=" + venueData.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps
                </a>
              )}

              <button
                className="border-2 border-yellow-500 text-main-yellow rounded-full py-2 px-8 w-full"
                onClick={createBookmark}>
                Bookmark Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
