import { configureStore } from "@reduxjs/toolkit";

// Reducers
import productsReducer from "./reducers";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
