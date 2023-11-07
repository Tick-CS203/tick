import { Steps, Select } from "antd";
import { useState, useEffect } from "react";
import { NationalStadium } from "../component/seatselection/NationalStadium";
import { RowData } from "../component/seatselection/RowData";
import { axiosInstance } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEventQuery } from "../api/events.query";
import { useSelector, useDispatch } from "react-redux";
import { updateEventDateID, updateEventID } from "../store/cartSlice";

export const SeatSelection = () => {
  const { id } = useParams();
  const { data: eventData, isLoading, isSuccess, isError } = useEventQuery(id);
  const { items } = useSelector((state) => state.cart);
  console.log(eventData);

  const [eventDateID, setEventDateID] = useState("");
  const [currSeatAvailability, setCurrSeatAvailability] = useState({});
  const [currCategory, setCurrCategory] = useState("");
  const [currSection, setCurrSection] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [availableSections, setAvailableSections] = useState({});
  const [eventDateOptions, setEventDateOptions] = useState([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.socket);
  const { accessToken, purchasingToken } = useSelector((state) => state.user);
  console.log(items);
  console.log(purchasingToken);

  const exitSession = () => {
    socket.emit("exit_session", {
      type: "CLIENT",
      room: id,
      token: accessToken,
    });
  };

  const handleUnload = () => {
    exitSession();
    socket.disconnect();
    console.log("disconnected");
    return "message";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const startCheckoutHandler = async () => {
    const redirectURL = await axiosInstance.post(
      "/payment/create-checkout-session",
      JSON.stringify(items)
    ); 
    dispatch(updateEventID(id))
    dispatch(updateEventDateID(eventDateID))
    window.location.href = redirectURL.data;
  };

  // create options for select dropdown
  useEffect(() => {
    if (eventData) {
      const options = [];
      eventData.date.map((d) =>
        options.push({
          label: new Date(d.eventDateTime).toUTCString(),
          value: d.eventDateID,
        })
      );
      setEventDateOptions(options);
    }
  }, [eventData]);

  // set seatAvailability, category and section based on eventDateID
  useEffect(() => {
    if (eventDateID !== "") {
      const seatAvailability = eventData.date.filter(
        (d) => d.eventDateID === eventDateID
      )[0].seatAvailability;
      setCurrSeatAvailability(seatAvailability);

      const category = Object.keys(seatAvailability)[0];
      setCurrCategory(category);
      setCurrSection(Object.keys(seatAvailability[category])[0]);
    }
  }, [eventDateID, eventData]);

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
      eventDateID &&
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
  }, [currCategory, currSection, eventDateID, currSeatAvailability]);

  return (
    <>
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
                setEventDateID(value);
              }}
            />
          )}
          {eventDateID.length > 0 && (
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
                    items.length === 0 ? "opacity-30" : ""
                  }`}
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
