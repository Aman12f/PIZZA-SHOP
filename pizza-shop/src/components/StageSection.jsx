import React from "react";
import PizzaCard from "./PizzaCard";

function StageSection({ orders, stage }) {
  // Filter and sort orders by timeSpent in descending order
  const sortedOrders = [...orders]
    .filter((order) => order.stage === stage)
    .sort((a, b) => b.timeSpent - a.timeSpent);

  return (
    <div className="col d-flex flex-column align-items-center">
      <h5 className="text-center mb-3">{stage}</h5>
      {sortedOrders.map((order) => (
        <PizzaCard key={order.id} order={order} />
      ))}
    </div>
  );
}

export default StageSection;

