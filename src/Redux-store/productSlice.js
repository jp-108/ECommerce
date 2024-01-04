import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  category: { id: "category", name: "Category", options: [] },
  brand: { id: "brand", name: "Brand", options: [] },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductList: (state, action)=>{
      state.products = action.payload;
      state.category.options = Array.from(new Set(action.payload.map((item) => item.subCategory))).map((item) => {
        return { value: item, label: item, checked: false };
      });

      state.brand.options = Array.from(new Set(action.payload.map((item) => item.brand))).map((item) => {
        return { value: item, label: item, checked: false };
      });
    },
    toggleFilter: (state, action) => {
      if (state.category.id === action.payload.filterId) {
        // Modify the draft directly within the Immer producer
        state.category.options = state.category.options.map((option) =>
          option.value === action.payload.value ? { ...option, checked: !option.checked } : option
        );
      } else if (state.brand.id === action.payload.filterId) {
        // Modify the draft directly within the Immer producer
        state.brand.options = state.brand.options.map((option) =>
          option.value === action.payload.value ? { ...option, checked: !option.checked } : option
        );
      }
    }
  },
});

export default productSlice.reducer;

export const { toggleFilter, getProductList } = productSlice.actions;
