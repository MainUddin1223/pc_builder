import { createSlice } from "@reduxjs/toolkit";
import { IComponent } from "../../types/types";


const initialState: IComponent = {
  cartComponents: [],
  count: 0,
};

export const pcBuilderSlice = createSlice({
  name: "cartComponents",
  initialState,
  reducers: {
    addToBuilder: (state, action) => {
      const isExisting = state.cartComponents.find(
        (component) => component._id === action.payload._id
      );
      if (isExisting) {
        isExisting.quantity = isExisting.quantity! + 1; //! type assertion
      } else {
        state.cartComponents.push({ ...action.payload, quantity: 1 });
      }
      state.count += 1;
    },
    removeFromCart: (state, action) => {
      const isExisting = state.cartComponents.find(
        (component) => component._id === action.payload._id
      );
      if (isExisting && isExisting?.quantity! > 1) {
        isExisting.quantity! -= 1;
        state.count -= 1;
      } else if (isExisting?.quantity === 1) {
        state.cartComponents = state.cartComponents.filter(
          (component) => component._id !== action.payload._id
        );
        state.count -= 1;
      }
    },
    resetComponent: (state) => {
      state.cartComponents = [];
      state.count = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBuilder, resetComponent, removeFromCart } =
  pcBuilderSlice.actions;

export default pcBuilderSlice.reducer;
