import { createSlice } from "@reduxjs/toolkit";
import { IComponent } from "../../types/types";




const initialState: IComponent = {
    component: [],
    count:0
};

export const pcBuilderSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
      addToBuilder: (state, action) => {
           const isExisting = state.component.find(
             (component) => component._id === action.payload._id
          );
              if (isExisting) {
                isExisting.quantity = isExisting.quantity! + 1; //! type assertion
                
              } else {
                state.component.push({ ...action.payload, quantity: 1 });
          }
          state.count+=1 
      },
      resetComponent: (state) => {
          state.component = []
          state.count=0
      }
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addToBuilder, resetComponent } = pcBuilderSlice.actions;

export default pcBuilderSlice.reducer;
