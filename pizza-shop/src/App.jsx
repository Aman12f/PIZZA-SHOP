import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderForm from "./components/OrderForm";
import StageSection from "./components/StageSection";
import MainDisplay from "./components/MainDisplay";
import { incrementTimeSpent } from "./features/ordersSlice";

function App() {
  const { orders } = useSelector((state) => state.orders); // Access the orders state
  const dispatch = useDispatch();

  // Increment time spent on each order every second
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(incrementTimeSpent());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [dispatch]);

  return (
    <div className="container" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-center">Pizza Shop</h1>
      {/* Form for placing new orders */}
      <OrderForm />
      <div>
      <h4 className="text-center mt-4">Orders by Stage</h4> {/* Heading for the entire section */}
      <div className="row mt-5" style={{
        padding:'20px',
        borderRadius:"16px",
        // border:"2px solid"
        backgroundColor:"white"
      }}>
        {/* Display orders in various stages */}
        <StageSection orders={orders} stage="Order Placed" />
        <StageSection orders={orders} stage="Order in Making" />
        <StageSection orders={orders} stage="Order Ready" />
        <StageSection orders={orders} stage="Order Picked" />
      </div>
    </div>
      {/* Main display for tracking orders */}
      <MainDisplay />
    </div>
  );
}

export default App;
