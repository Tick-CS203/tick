import { Steps } from "antd";
import { NationalStadium } from "../component/seatselection/NationalStadium";
import { RowData } from "../component/seatselection/RowData";

export const SeatSelection = () => {
  return (
    <>
      <p className="font-inter font-black text-white italic text-xl py-5 relative uppercase">
        Lauv: The Between Albums Tour in Singapore
      </p>
      <Steps
        current={1}
        items={[
          {
            title: "Seat Selection",
          },
          {
            title: "Confirmation",
          },
          {
            title: "Payment",
          },
        ]}
      />
      <div className="flex flex-row">
        <NationalStadium />
        <div className="flex flex-col gap-y-2">
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
        </div>
      </div>
    </>
  );
};
