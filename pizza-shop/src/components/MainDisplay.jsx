import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, incrementTimeSpent } from "../features/ordersSlice";
import { formatTime } from "../utils/utils";
import { sizeTimeMap } from "../utils/utils";

function MainDisplay() {
  const { orders, deliveredCount } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // Function to calculate the remaining time based on pizza size
  const calculateRemainingTime = (order) => {
    const remainTime =  sizeTimeMap[order.size] - order.timeSpent;
    if(order.stage === "Order Ready" || order.stage === "Order Picked") {
      return 0;
    }
    return remainTime >= 0 ? remainTime : 0;
  };
  

  // Function to handle cancel action
  const handleCancel = (id) => {
    const order = orders.find((order) => order.id === id);
    if (order && (order.stage !== "Order Ready")) {
      dispatch(cancelOrder(id)); // Dispatch cancelOrder only if stage is not "Order Ready"
    }
  };

  return (
    <div className="mt-4" style={{
      padding:'40px',
      borderRadius:"16px",
      // border:"2px solid"
      backgroundColor:"white"
    }}>
      <h4 className="text-center">Main Display</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Stage</th>
            <th>Remaining Time</th>
            <th>Total Time Spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              <td>{formatTime(calculateRemainingTime(order))}</td>
              <td>{formatTime(order.totalTimeSpent)}</td>
              <td>
  {(order.stage !== "Order Ready" && order.stage !== "Order Picked") && (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => handleCancel(order.id)} // Call handleCancel when clicked
    >
      Cancel
    </button>
  )}
</td>

            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-end">
              <strong>Total Orders Delivered</strong>
            </td>
            <td>
              <strong>{deliveredCount}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MainDisplay;
