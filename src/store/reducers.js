import { createSlice } from "@reduxjs/toolkit";
import { data } from "../static/data";

const initialState = {
  resetChosenQuantityProduct: false,
  chosenProducts: [],
  changeCoins: 10,
  data,
  step: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reducerResetChosenQuantityProduct: (state, { payload }) => {
      state.resetChosenQuantityProduct = payload;
    },
    reducerToChosenProducts: (state, { payload: products }) => {
      state.chosenProducts = products;
    },
    reducerChangeCoins: (state, { payload: changeCoins }) => {
      state.changeCoins = changeCoins;
    },
    reduceChangeData: (state, { payload }) => {
      state.data = payload;
    },
    reducerStep: (state, { payload: step }) => {
      state.step = step;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  reducerResetChosenQuantityProduct,
  reducerToChosenProducts,
  reducerChangeCoins,
  reduceChangeData,
  reducerStep,
} = counterSlice.actions;

export default counterSlice.reducer;
