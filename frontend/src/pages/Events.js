import { useEventsQuery, useFilteredEventsQuery } from "../api/events.query.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "../component/homepage/Event";
import { Slider, InputNumber, DatePicker } from "antd";
import BlueFire from "../assets/blue-fire.png"
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import dayjs from 'dayjs';

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

  const onStartDateChange = (selectedDate) => {
    if (selectedDate) {
      setEnteredStartDate(dayjs(selectedDate).format('YYYY-MM-DD') + "T00:00:00");
    }
  };

  const onEndDateChange = (selectedDate) => {
    if (selectedDate) {
      setEnteredEndDate(dayjs(selectedDate).format('YYYY-MM-DD') + "T00:00:00");
    }
  };

  return (
    <>
      {isLoading && <p className="text-white"> Loading... </p>}

      {isError && (
        <p className="text-main-red"> Error 404: Events not found </p>
      )}

      <div className="flex lg:flex-row flex-col w-full gap-4 justify-center">
        <form
          className="flex flex-wrap gap-4 lg:w-2/5 w-full justify-center"
          onSubmit={filterEvents}
        >
          <div className="flex flex-col gap-y-10 justify-left">
            <div className="flex flex-row items-end">

              <div className="flex flex-col mr-3">
                <label className="text-main-yellow font-inter italic font-extrabold text-l">
                  START DATE
                </label>
                {isSuccess && (
                  <DatePicker
                    className="bg-black border-b-[1px] mt-2 border-main-yellow text-main-yellow"
                    onChange={onStartDateChange} />
                )}
              </div>

              <HiOutlineArrowNarrowRight size={"2.5em"} color="yellow" />

              <div className="flex flex-col ml-3">
                <label className="text-main-yellow font-inter italic font-extrabold text-l">
                  END DATE
                </label>
                {isSuccess && (
                  <DatePicker
                    className="bg-black border-b-[1px] mt-2 border-main-yellow text-main-yellow"
                    onChange={onEndDateChange} />
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
                  <option value="Rock">Rock</option>
                  <option value="Classical">Classical</option>
                  <option value="Pop">Pop</option>
                  <option value="Theatre">Theatre</option>
                  <option value="Musical">Musical</option>
                </select>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-main-blue font-inter italic font-extrabold text-l">
                MAXIMUM PRICE
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

        <div className="lg:w-3/5 w-full">
          {isSuccess && filteredEvents && (
            <>
              <h2 className="text-white font-inter italic font-extrabold lg:text-left">
                WE FOUND {filteredEvents.length} RELATED EVENT(S) FOR YOU
              </h2>
              <div className="mt-4 flex flex-wrap gap-4">
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
        </>
          )}
      </div>
    </div >
    </>
  );
};
