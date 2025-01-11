import React from "react";
import { useDispatch } from "react-redux";
import { updateOrderStage, incrementDeliveredCount } from "../features/ordersSlice";
import { formatTime } from "../utils/utils";
import { sizeTimeMap } from "../utils/utils";

function PizzaCard({ order }) {
  const dispatch = useDispatch();

  const handleNextStage = () => {
    const nextStages = {
      "Order Placed": "Order in Making",
      "Order in Making": "Order Ready",
      "Order Ready": "Order Picked",
    };
    const nextStage = nextStages[order.stage];
    if (nextStage) {
      dispatch(updateOrderStage({ id: order.id, stage: nextStage }));
      if (nextStage === "Order Picked") {
        dispatch(incrementDeliveredCount());
      }
    }
  };
  const timeLimit = sizeTimeMap[order.size];
  const isOverTime = order.timeSpent > timeLimit;

  return (
    <div
    className={`card ${isOverTime ? "bg-danger text-white" : ""} w-75`}
    style={{ marginBottom: "10px" }}
  >
      <div className="card-body shadow text-center"> {/* Add text-center here */}
        <h5 className="card-title">{order.id}</h5>
        <p className="card-text">
          {order.stage} <br />
          {order.stage !== "Order Picked" && (
            <>
              {formatTime(order.timeSpent)}
            </>
          )}
        </p>
        {order.stage !== "Order Picked" && (
          <button className="btn btn-success me-2" onClick={handleNextStage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default PizzaCard;
