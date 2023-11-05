import { Steps, Select } from "antd";
import { useState, useEffect } from "react";
import { NationalStadium } from "../component/seatselection/NationalStadium";
import { RowData } from "../component/seatselection/RowData";
import { axiosInstance } from "../api/axios";
import { useParams } from "react-router-dom";
import { useEventQuery } from "../api/events.query";
import { useSelector } from "react-redux";

export const SeatSelection = () => {
  const { id } = useParams();
  const { data: eventData, isLoading, isSuccess, isError } = useEventQuery(id);
  console.log(eventData);
  const { items, purchasingToken } = useSelector((state) => state.cart);

  const [currEventDateTime, setCurrEventDateTime] = useState("");
  const [currSeatAvailability, setCurrSeatAvailability] = useState({});
  const [currCategory, setCurrCategory] = useState("");
  const [currSection, setCurrSection] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [availableSections, setAvailableSections] = useState({});
  const [eventDateOptions, setEventDateOptions] = useState([]);
  console.log(items);
  console.log(purchasingToken);

  // Countdown timer state
  const [countdown, setCountdown] = useState(600); // 600 seconds = 10 mins

  // Countdown timer function
  const startCountdown = () => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); // Update countdown every 1 second
    } else {
      window.location.href = "/"; // Redirect to homepage
      alert("Error: Time limit exceeded. Please try again.");
    }
  };

  // Start the countdown when the component mounts
  useEffect(() => {
    startCountdown();
  }, [countdown]);

  const startCheckoutHandler = async () => {
    const redirectURL = await axiosInstance.post(
      "/payment/create-checkout-session",
      JSON.stringify(items)
    );
    console.log(redirectURL);
    window.location.href = redirectURL.data;
  };

  // create options for select dropdown
  useEffect(() => {
    if (eventData) {
      const options = [];
      eventData.date.map((d) =>
        options.push({
          label: new Date(d.eventDateTime).toUTCString(),
          value: d.id,
        })
      );
      setEventDateOptions(options);
    }
  }, [eventData]);

  // set seatAvailability, category and section based on currEventDateTime
  useEffect(() => {
    if (currEventDateTime !== "") {
      const seatAvailability = eventData.date.filter(
        (d) => d.id === currEventDateTime
      )[0].seatAvailability;
      setCurrSeatAvailability(seatAvailability);

      const category = Object.keys(seatAvailability)[0];
      setCurrCategory(category);
      setCurrSection(Object.keys(seatAvailability[category])[0]);
    }
  }, [currEventDateTime, eventData]);

  // calculate whether each section is available
  useEffect(() => {
    const availableSectionMap = {};

    for (const c of Object.keys(currSeatAvailability)) {
      availableSectionMap[c] = {};
      for (const s of Object.keys(currSeatAvailability[c])) {
        let available = false;
        for (const r of Object.keys(currSeatAvailability[c][s])) {
          if (currSeatAvailability[c][s][r] > 0) {
            availableSectionMap[c][s] = 1;
            available = true;
            break;
          }
        }
        if (!available) {
          availableSectionMap[c][s] = 0;
        }
      }
    }

    setAvailableSections(availableSectionMap);
  }, [currSeatAvailability]);

  // filter for rows that have seats available
  useEffect(() => {
    if (
      currEventDateTime &&
      currSeatAvailability &&
      currCategory &&
      currSection
    ) {
      const output = [];
      const rows = currSeatAvailability[currCategory][currSection];
      for (const r of Object.keys(rows)) {
        if (rows[r] > 0) {
          output.push({ row: r, availability: rows[r] });
        }
      }

      setFilteredRows(output);
    }
  }, [currCategory, currSection, currEventDateTime, currSeatAvailability]);

  return (
    <>
      <div style={{
        position: "fixed",
        bottom: 25,
        right: 50,
        zIndex: 9999,
      }}>
        <div style={{
          background: "red",
          color: "white",
          padding: "6px 12px",
          borderRadius: "10px",
          display: "inline-block",
        }}>
          <b>Time Left: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</b>
        </div>
      </div>

      {isLoading && <p className="text-white"> Loading... </p>}

      {isError && <p className="text-white"> Error 404 : Event not found </p>}
      {isSuccess && (
        <>
          <Steps
            className="py-4 w-10/12"
            current={1}
            items={[
              {
                title: "Queue",
              },
              {
                title: "Seat Selection",
              },
              {
                title: "Payment",
              },
            ]}
          />
          <p className="font-inter font-black text-white italic text-xl py-5 relative uppercase">
            {eventData.name}
          </p>
          <label className="text-white pe-2">Selected DateTime:</label>
          {eventDateOptions && (
            <Select
              className="border-b border-white w-2/3"
              defaultValue={eventDateOptions[0]}
              bordered={false}
              options={eventDateOptions}
              onChange={(value) => {
                setCurrEventDateTime(value);
              }}
            />
          )}
          {currEventDateTime.length > 0 && (
            <>
              <div className="w-auto flex lg:flex-row lg:gap-x-2 flex-col gap-y-4 lg:my-8 my-4">
                <div className="bg-white rounded-xl p-8 h-fit w-full">
                  <NationalStadium
                    setCurrSection={setCurrSection}
                    setCurrCategory={setCurrCategory}
                    availableSections={availableSections}
                  />
                </div>
                <div className="flex flex-col gap-y-2 lg:h-[700px] max-h-[400px] overflow-auto">
                  {filteredRows.length > 0 &&
                    filteredRows.map((row) => {
                      return (
                        <RowData
                          key={`${currCategory}:${currSection}:${row.row}`}
                          category={currCategory}
                          section={currSection}
                          row={row.row}
                          available={row.availability}
                          price={
                            eventData.prices[
                            currCategory.charAt(currCategory.length - 1) - 1
                            ]
                          }
                          purchaseLimit={eventData.ticketLimit}
                        />
                      );
                    })}
                  {filteredRows.length === 0 && (
                    <p className="text-white font-inter">
                      No rows available for this section!
                    </p>
                  )}
                </div>
              </div>
              <p className="font-inter font-black text-main-yellow italic text-xl py-4 uppercase">
                Selected Seats
              </p>
              <div className="flex flex-col items-center">
                <table className="w-11/12 text-center my-4">
                  <thead>
                    <tr className="text-white border-y border-white">
                      <th className="py-1">Category</th>
                      <th className="py-1">Section</th>
                      <th className="py-1">Row</th>
                      <th className="py-1">Quantity</th>
                      <th className="py-1">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      return (
                        <tr
                          className="text-main-yellow border-b border-main-yellow py-5"
                          key={`${item.category}:${item.section}:${item.row}`}
                        >
                          <td className="py-1">{item.category}</td>
                          <td className="py-1">{item.section}</td>
                          <td className="py-1">{item.row}</td>
                          <td className="py-1">{item.quantity}</td>
                          <td className="py-1">
                            ${item.price * item.quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className={`bg-main-yellow text-black px-4 py-1 my-4 rounded-md font-inter text-sm font-semibold w-[150px] mx-auto ${
                    items.length === 0 ? "opacity-30" : ""}`}
                  disabled={items.length === 0}
                  onClick={startCheckoutHandler}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
