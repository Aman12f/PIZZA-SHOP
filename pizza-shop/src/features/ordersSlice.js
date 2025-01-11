// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   orders: [], // List of all orders
//   deliveredCount: 0, // Total delivered orders
// };

// const ordersSlice = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {
//     addOrder(state, action) {
//       state.orders.push(action.payload);
//     },
//     updateOrderStage(state, action) {
//       const { id, stage } = action.payload;
//       const order = state.orders.find((order) => order.id === id);
//       if (order) {
//         order.stage = stage;
//         order.timeSpent = 0;
//       }
//     },
//     cancelOrder(state, action) {
//       state.orders = state.orders.filter((order) => order.id !== action.payload);
//     },
//     incrementDeliveredCount(state) {
//       state.deliveredCount += 1;
//     },
//     incrementTimeSpent(state) {
//         state.orders.forEach((order) => {
//           order.timeSpent += 1;
//         });
//       }
      
//   },
// });

// export const { addOrder, updateOrderStage, cancelOrder, incrementDeliveredCount,incrementTimeSpent } =
//   ordersSlice.actions;
// export default ordersSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [], // List of all orders
  deliveredCount: 0, // Total delivered orders
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.orders.push({
        ...action.payload,
        totalTimeSpent: 0, // Initialize totalTimeSpent
      });
    },
    updateOrderStage(state, action) {
      const { id, stage } = action.payload;
      const order = state.orders.find((order) => order.id === id);
      if (order) {
        order.stage = stage;
        order.timeSpent = 0; // Reset stage-specific time spent
      }
    },
    cancelOrder(state, action) {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
    incrementDeliveredCount(state) {
      state.deliveredCount += 1;
    },
    incrementTimeSpent(state) {
      state.orders.forEach((order) => {
        order.timeSpent += 1; // Increment time spent in the current stage
        if(order.stage !=='Order Picked')
        {
          order.totalTimeSpent += 1; // Increment total time spent across all stages
        }
      });
    },
  },
});

export const {
  addOrder,
  updateOrderStage,
  cancelOrder,
  incrementDeliveredCount,
  incrementTimeSpent,
} = ordersSlice.actions;

export default ordersSlice.reducer;

