import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  item: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if the item is already in the cart
      const existingItem = state.item.find((item) => item._id === action.payload.id);

      // If the item is not in the cart, add it
      if (!existingItem) {
        state.data.push(action.payload);
        state.item.push({ _id: action.payload.id, qty: 1 });
      } else {
        // If the item is already in the cart, update its quantity
        state.item = state.item.map((item) => (item._id === action.payload.id ? { ...item, qty: item.qty + 1 } : item));
      }
    },

    increaseQty: (state, action) => {
      state.item = state.item.map((item) => (item._id === action.payload ? { ...item, qty: item.qty + 1 } : item));
    },

    decreaseQty: (state, action) => {
      state.item = state.item.map((item) => (item._id === action.payload && item.qty !== 1 ? { ...item, qty: item.qty - 1 } : item));
    },

    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id != action.payload);
      state.item = state.item.filter((item) => item._id != action.payload);
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem } = productSlice.actions;
export default productSlice.reducer;
