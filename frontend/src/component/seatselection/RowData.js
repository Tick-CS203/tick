import { useState } from "react";

export const RowData = (props) => {
  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    setQuantity(Math.max(0, quantity - 1));
  }

  // need to include purchase limit
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  return (
    <div className="border border-solid border-main-yellow rounded-xl p-4">
      <p className="font-inter font-black text-main-yellow italic text-xl relative uppercase">
        Section {props.section}, Row {props.row}
      </p>
      <p className="text-white">{props.available} seats available</p>
      <div className="flex justify-end mt-4">
        <button className="ms-96 bg-main-yellow px-3 py-2 font-inter font-bold rounded-l-md border border-black border-solid" onClick={decreaseQuantity}>-</button>
        <button className="bg-main-yellow min-w-[80px] py-2 font-inter font-bold border border-black border-solid">{quantity}</button>
        <button className="bg-main-yellow px-3 py-2 font-inter font-bold rounded-r-md border border-black border-solid" onClick={increaseQuantity}>+</button>
      </div>
    </div>
  );
};
