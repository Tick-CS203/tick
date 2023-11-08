import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity } from "../../store/cartSlice";

// ensures that total quantity is under purchase limit
export const RowData = (props) => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    setQuantity(Math.max(0, quantity - 1));
    dispatch(
      updateCartQuantity({
        type: "REMOVE",
        category: props.category,
        section: props.section,
        row: props.row,
        purchaseLimit: props.purchaseLimit,
        price: props.price.price,
        priceID: props.price.priceID,
      })
    );
  };

  const increaseQuantity = () => {
    if (totalQuantity === props.purchaseLimit) {
      return;
    }
    setQuantity(Math.min(props.purchaseLimit, quantity + 1));
    dispatch(
      updateCartQuantity({
        type: "ADD",
        category: props.category,
        section: props.section,
        row: props.row,
        purchaseLimit: props.purchaseLimit,
        price: props.price.price,
        priceID: props.price.priceID,
      })
    );
  };

  return (
    <div className="border border-solid border-main-yellow rounded-xl p-4">
      <p className="font-inter font-black text-main-yellow italic text-xl relative uppercase">
        Section {props.section}, Row {props.row}
      </p>
      <p className="text-white">{props.available} seats available</p>
      <div className="flex justify-end mt-4">
        <button
          className="text-black ms-96 bg-main-yellow px-3 py-2 font-inter font-bold rounded-l-md border border-black border-solid"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <button className="text-black bg-main-yellow min-w-[80px] py-2 font-inter font-bold border border-black border-solid">
          {quantity}
        </button>
        <button
          className="text-black bg-main-yellow px-3 py-2 font-inter font-bold rounded-r-md border border-black border-solid"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};
