import React from "react";

type Props = {
  status: {
    title: string;
    value: number;
    color: string;
  };
};

const OrderStatusCell = ({ status }: Props) => {
  return (
    <div className="order-status-cell">
      <span
        className="status-dot"
        style={{
          backgroundColor: status.color,
        }}
      />
      <span className="status-title">{status.title}</span>
      <span className="status-value">{status.value}%</span>
    </div>
  );
};

export default OrderStatusCell;
