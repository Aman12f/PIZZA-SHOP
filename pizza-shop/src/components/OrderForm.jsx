import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../features/ordersSlice";

function OrderForm() {
  const [type, setType] = useState("Veg");
  const [size, setSize] = useState("Small");
  const [base, setBase] = useState("Thin");
  const dispatch = useDispatch();
  const { orders,  deliveredCount } = useSelector((state) => state.orders); // Access the orders state

  const MAX_ORDERS = 10; // Maximum orders allowed

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: `Order ${Math.random().toString(36).substr(2, 5)}`,
      type,
      size,
      base,
      stage: "Order Placed",
      timeSpent: 0,
      totalTimeSpent: 0,
    };
    dispatch(addOrder(order));
  };

  return (
    <div style={{
      padding:'30px',
      borderRadius:"16px",
      // border:"2px solid"
      backgroundColor:"white"
    }}>
      <form
        onSubmit={handleSubmit}
        className="mb-3"
        style={{ pointerEvents: orders.length-deliveredCount >= MAX_ORDERS ? "none" : "auto" }}
      >
        <div className="mb-2">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Size</label>
          <select
            className="form-select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Base</label>
          <select
            className="form-select"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          >
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </div>
        <button
  type="submit"
  className="btn"
  disabled={orders.length - deliveredCount >= MAX_ORDERS}
  style={{
    backgroundColor: "#5F00D9",
    color: "white",
  }}
>
  Place Order
</button>

      </form>

      {/* Display message if the restaurant is at maximum capacity */}
      {orders.length-deliveredCount >= MAX_ORDERS && (
        <div className="alert alert-warning text-center">
          Not taking any orders for now.
        </div>
      )}
    </div>
  );
}

export default OrderForm;
