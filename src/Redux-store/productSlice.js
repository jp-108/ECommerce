import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchProductData = createAsyncThunk("products/fetchProductData", async (apiUrl) => {
  const response = await fetch(`https://dummyjson.com/products/${apiUrl}`);
  const data = response.json();
  return data;
});

const initialState = {
  products: [],
  category: { id: "category", name: "Category", options: [] },
  brand: { id: "brand", name: "Brand", options: [] },
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state, action) => {
        state.status = "loading...";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.products = action.payload.products;
        state.category.options = Array.from(new Set(action.payload.products.map((item) => item.category))).map((item) => {
          return { value: item, label: item, checked: false };
        });

        state.brand.options = Array.from(new Set(action.payload.products.map((item) => item.brand))).map((item) => {
          return { value: item, label: item, checked: false };
        });
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "Rejected";
      });
  },
});

export default productSlice.reducer;
export { fetchProductData };
export const { toggleFilter } = productSlice.actions;
