import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, eventID: "", eventDateID: "" },
  reducers: {
    updateCartQuantity: (state, action) => {
      const { type, category, section, row, purchaseLimit, price, priceID } = action.payload;

      const existingCartItemIndex = state.items.findIndex(
        (item) =>
          item.category === category &&
          item.section === section &&
          item.row === row
      );

      if (type === "ADD") {
        if (state.totalQuantity === purchaseLimit) {
          return;
        }

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
          updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat({
            category: category,
            section: section,
            row: row,
            quantity: 1,
            price: price,
            priceID: priceID
          });
        }
        state.totalQuantity += 1;
        state.items = updatedItems;
      }

      if (type === "REMOVE") {
        if (existingCartItemIndex === -1) return
        const existingItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingItem.quantity === 1) {
          updatedItems = state.items.filter(
            (item) =>
              !(
                item.category === category &&
                item.section === section &&
                item.row === row
              )
          );
        } else {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }

        state.totalQuantity -= 1;
        state.items = updatedItems;
      }
    },
    updateEventID: (state, action) => {
      state.eventID = action.payload;
    },
    updateEventDateID: (state, action) => {
      state.eventDateID = action.payload;
    },
  },
});

export const { updateCartQuantity, updateEventID, updateEventDateID } = cartSlice.actions;

export default cartSlice.reducer;
