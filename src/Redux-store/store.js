import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";


const store = configureStore({
  reducer: {
    cartSlice,
    productSlice,
    authSlice
  },
});

export default store;
