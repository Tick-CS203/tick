import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    updateCartQuantity: (state, action) => {
      const { type, category, section, row, purchaseLimit, price, priceId } = action.payload;

      if (type === "ADD") {
        if (state.totalQuantity === purchaseLimit) {
            return;
        }
        const existingCartItemIndex = state.items.findIndex(
          (item) =>
            item.category === category &&
            item.section === section &&
            item.row === row
        );

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
            priceId: priceId
          });
        }
        state.totalQuantity += 1;
        state.items = updatedItems;
      }

      if (type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(
          (item) =>
            item.category === category &&
            item.section === section &&
            item.row === row
        );
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
  },
});

export const { updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
