import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/ordersSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export default store;
