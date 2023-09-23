import LauvConcertDetailsImage from "../assets/dgszkvmg0llbhkxivzhm.jpg";
import { useEventQuery } from "../api/events.query.js";
import { useParams } from "react-router-dom";

<script
  src="https://kit.fontawesome.com/12bbdb3ccf.js"
  crossorigin="anonymous"
></script>;

export const EventDetails = () => {
  const { id } = useParams(); // {id: 123}

  const { data: event, isLoading, isSuccess, isError } = useEventQuery(id);
  console.log(event);

  return (
    <>
      {isLoading && <p className="text-white"> Loading... </p>}

      {isError && <p className="text-white"> Error 404 : Event not found </p>}

      {isSuccess && (
        <>
            <img
              class="flex justify-center"
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
              class="inline-block"
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="20"
              height="40"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              ></path>
            </svg>
            <span className="text-white pl-5">{event.venueID}</span>
          </div>

          <div>
            <svg
              class="inline-block"
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="20"
              height="40"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              ></path>
            </svg>
            <span className="text-white pl-5">{/* {event.date} */}</span>
          </div>

          <p className="font-inter font-black text-main-blue italic text-2xl pt-10 relative">
            ABOUT
          </p>

          <p className="font-inter text-white pt-5 pb-3 relative">
            {/* {event.description} */}
          </p>

          <p className="font-inter font-black text-main-yellow italic text-2xl pt-10 relative">
            PRICING
          </p>

          <p className="font-inter text-white pt-5 pb-3 relative">
            {/* {event.price} */}
          </p>

          <p className="font-inter font-black text-main-red italic text-2xl pt-10 relative">
            EXCHANGE & REFUND POLICY
          </p>

          <p className="font-inter font-black text-white italic text-2xl pt-10 relative">
            ADMISSION POLICY
          </p>

          <p className="font-inter font-black text-main-blue italic text-2xl pt-10 pb-10 relative">
            HOW TO BUY TICKETS
          </p>
        </>
      )}
    </>
  );
};
