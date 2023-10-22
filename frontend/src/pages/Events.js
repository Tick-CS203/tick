import { useEventsQuery, useFilteredEventsQuery } from "../api/events.query.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "../component/homepage/Event";

export const Events = () => {

    const [ enteredCategory, setEnteredCategory ] = useState("");  
    const [ enteredMaxPrice, setEnteredMaxPrice ] = useState("");     
    const [ enteredEventDateTime, setEnteredEventDateTime ] = useState("");      

    const { data: events, isLoading, isSuccess, isError } = useEventsQuery();
    console.log(events);

    async function FilterEvents(event) {
        event.preventDefault();

        const category = enteredCategory;
        const maxPrice = enteredMaxPrice;
        const eventDateTime = enteredEventDateTime;

        const { data: filteredEvents, isLoading, isSuccess, isError, error } = useFilteredEventsQuery(category, maxPrice, eventDateTime);
        console.log(filteredEvents);

        if (isLoading) {
            return <div>Loading...</div>;
          }
        
          if (isError) {
            console.error('Error:', error); 
            return <p className="text-white"> There aren't any events which fit your criteria </p>;
          }
        
    }

    return (
        <>
          {isLoading && <p className="text-white"> Loading... </p>}
    
          {isError && <p className="text-white"> Error 404: Events not found </p>}
    
          {isSuccess && (
            //filter & results
            <form className="flex flex-wrap justify-around gap-4" onSubmit={FilterEvents}>
              <div className="flex flex-col gap-y-10 justify-left">
                <div className="flex flex-col">
                    <label className="text-main-yellow font-inter italic font-extrabold text-l ">
                        DATE
                    </label>
                    <input 
                    className="bg-black border-b-[1px] border-main-yellow w-4/5 text-main-yellow"
                    type="date"
                    onChange={(event) => {
                        setEnteredEventDateTime(event.target.value);
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
                    
                <button type="submit" className="bg-main-yellow text-black font-inter font-semibold rounded-lg w-52 h-9">Filter</button>
              </div>

              <div className="flex flex-wrap justify-around gap-y-4">
                {events && events.map((event) => (
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
            </form>
          )}
        </>
      );
}

