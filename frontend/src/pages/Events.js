import { useEventsQuery, useFilteredEventsQuery } from "../api/events.query.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "../component/homepage/Event";
import { Slider, InputNumber } from "antd";
import BlueFire from "../assets/blue-fire.png"
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export const Events = () => {
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredMaxPrice, setEnteredMaxPrice] = useState(400);
  const [enteredStartDate, setEnteredStartDate] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");

  const {
    data: events,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useEventsQuery();
  console.log(events);

  const { data: filteredEvents } = useFilteredEventsQuery(
    enteredCategory,
    enteredMaxPrice,
    enteredStartDate,
    enteredEndDate
  );
  console.log(filteredEvents);

  const filterEvents = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {isLoading && <p className="text-white"> Loading... </p>}

      {isError && (
        <p className="text-main-red"> Error 404: Events not found </p>
      )}

      <div className="flex lg:flex-row flex-col w-full justify-around gap-4">
        <form
          className="flex flex-wrap justify-around gap-4 w-2/5"
          onSubmit={filterEvents}
        >
          <div className="flex flex-col gap-y-10 justify-left">
            <div className="flex flex-row items-end">

            <div className="flex flex-col ">
                <label className="text-main-yellow font-inter italic font-extrabold text-l">
                  START DATE
                </label>
                {isSuccess && (
                  <input
                    className="bg-black border-b-[1px] border-main-yellow text-main-yellow"
                    type="date"
                    onChange={(event) => {
                      setEnteredStartDate(event.target.value);
                    }}
                  />
                )}
              </div>

              <HiOutlineArrowNarrowRight size={"2.5em"} color="yellow"/>

              <div className="flex flex-col ml-3">
                <label className="text-main-yellow font-inter italic font-extrabold text-l">
                  END DATE
                </label>
                {isSuccess && (
                  <input
                    className="bg-black border-b-[1px] border-main-yellow text-main-yellow"
                    type="date"
                    onChange={(event) => {
                      setEnteredEndDate(event.target.value);
                    }}
                  />
                )}
              </div>
            </div>
              


            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-main-red font-inter italic font-extrabold text-l "
              >
                CATEGORY
              </label>
              {isSuccess && (
                <select
                  id="category"
                  className="bg-black border-b-[1px] border-main-red text-main-red"
                  onChange={(event) => setEnteredCategory(event.target.value)}
                >
                  <option value=""></option>
                  <option value="Kpop">Kpop</option>
                  <option value="Classical">Classical</option>
                  <option value="Dance">Dance</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Theatre">Theatre</option>
                  <option value="Concert">Concert</option>
                  <option value="Musical">Musical</option>
                </select>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-main-blue font-inter italic font-extrabold text-l ">
                PRICE RANGE
              </label>
              {isSuccess && (
                <>
                  <Slider
                    min={1}
                    max={800}
                    value={enteredMaxPrice}
                    onChange={(value) => {
                      setEnteredMaxPrice(value);
                    }}
                    tooltip={{ open: true }}
                  />
                  <InputNumber
                    min={1}
                    max={800}
                    value={enteredMaxPrice}
                    onChange={(value) => {
                      setEnteredMaxPrice(value);
                    }}
                    className="border-main-blue text-center"
                  />
                </>
              )}
            </div>
            <img className="w-[80px] h-[80px]" src={BlueFire} alt="Blue Fire" />
          </div>
        </form>

        <div className="w-3/5">
          {isSuccess && filteredEvents && (
            <>
              <div className="flex flex-col justify-center">
              <h2 className="text-white font-inter italic font-extrabold">
                WE FOUND {filteredEvents.length} RELATED EVENT(S) FOR YOU
              </h2>
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
              </div>
              
            </>
          )}
        </div>
      </div>
    </>
  );
};
