import { Steps, Select } from "antd";
import { NationalStadium } from "../component/seatselection/NationalStadium";
import { RowData } from "../component/seatselection/RowData";

export const SeatSelection = () => {
  return (
    <>
      <p className="font-inter font-black text-white italic text-xl py-5 relative uppercase">
        Lauv: The Between Albums Tour in Singapore
      </p>
      <label className="text-white pe-2">Selected DateTime:</label>
      <Select
        className="border-b border-white"
        defaultValue="27 Jan 2024・Sat・19:30 SGT - 23:00 SGT"
        bordered={false}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          {
            value: "real date",
            label: "27 Jan 2024・Sat・19:30 SGT - 23:00 SGT",
          },
        ]}
      />
      <Steps
        className="mt-8 w-10/12"
        current={0}
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
      <div className="w-auto flex lg:flex-row lg:gap-x-2 flex-col gap-y-4 lg:my-8 my-4">
        <div className="bg-white rounded-xl p-8 h-fit w-full">
          <NationalStadium />
        </div>
        <div className="flex flex-col gap-y-2 lg:h-[700px] h-[400px] overflow-auto">
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
          <RowData section="PF1" row="A" available="9" />
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
            </tr>
          </thead>
          <tbody>
            <tr className="text-main-yellow border-b border-main-yellow py-5">
              <td className="py-1">CAT1</td>
              <td className="py-1">119</td>
              <td className="py-1">A</td>
              <td className="py-1">1</td>
            </tr>
          </tbody>
        </table>
        <button className="bg-main-yellow text-black px-4 py-1 my-4 rounded-md font-inter text-sm font-semibold w-[150px] mx-auto">
          Next
        </button>
      </div>
    </>
  );
};
