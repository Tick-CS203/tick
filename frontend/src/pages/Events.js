import { useEventsQuery, useFilteredEventsQuery } from "../api/events.query.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "../component/homepage/Event";
import { format } from 'date-fns';

export const Events = () => {

  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredMaxPrice, setEnteredMaxPrice] = useState("");
  const [enteredEventDateTime, setEnteredEventDateTime] = useState("");

  const { data: events, isLoading, isSuccess, isError, error } = useEventsQuery();

  const { data: filteredEvents } = useFilteredEventsQuery(
      enteredCategory,
      enteredMaxPrice,
      enteredEventDateTime
  );

  const filterEvents = (event) => {
      event.preventDefault();
      
  };

  function convertToLocalDateTime(date) {

    const parts = date.split("-");
        if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10) + 1;
        const jsDate = new Date(year, month, day);
        return jsDate.toISOString().split('Z')[0];
    }
  }

    return (
        <>
          {isLoading && <p className="text-white"> Loading... </p>}
    
          {isError && <p className="text-main-red"> Error 404: Events not found </p>}
          
          <div className="flex flex-row justify-around gap-4">
          {isSuccess && (
            
            <form className="flex flex-wrap justify-around gap-4" onSubmit={filterEvents}>
              <div className="flex flex-col gap-y-10 justify-left">
                <div className="flex flex-col">
                    <label className="text-main-yellow font-inter italic font-extrabold text-l ">
                        DATE
                    </label>
                    <input 
                    className="bg-black border-b-[1px] border-main-yellow w-4/5 text-main-yellow"
                    type="date"
                    onChange={(event) => {
                        setEnteredEventDateTime(convertToLocalDateTime(event.target.value));
                        }}/>
                </div>

                <div className="flex flex-col">
                    <label className="text-main-red font-inter italic font-extrabold text-l ">
                        CATEGORY
                    </label>
                    <input 
                    className="bg-black border-b-[1px] border-main-red w-4/5 text-main-red"
                    type="text"
                    onChange={(event) => {
                        setEnteredCategory(event.target.value);
                        }}/>
                </div>

                <div className="flex flex-col">
                    <label className="text-main-blue font-inter italic font-extrabold text-l ">
                        PRICE RANGE
                    </label>
                    <input 
                    className="bg-black border-b-[1px] border-main-blue w-4/5 text-main-blue"
                    type="text"
                    onChange={(event) => {
                        setEnteredMaxPrice(event.target.value);
                        }}/>
                </div>
              </div>
            </form>
          )}

          {isSuccess && filteredEvents && (
                <div className="flex flex-wrap justify-around gap-y-4">
                    {filteredEvents.map((event) => (
                        <Link to={`/event/${event.eventID}`} key={event.eventID}>
                            <Event
                                eventId={event.eventID}
                                imageURL={event.banner}
                                eventName={event.name}
                                eventDates={event.date}
                            />
                        </Link>
                    ))}
                </div>
            )}
          </div>
        </>
      );
}
