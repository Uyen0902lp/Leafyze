"use client";
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import OrderStatusChart from "./OrderStatusChart";
import OrderStatusCell from "./OrderStatusCell";
import { OrderStatusType } from "./OrderStatusType";
import { useShowAllOrdersQuery } from "@/redux/api/orderApiSlice";

const { Option } = Select;

const OrderStatus: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); 
  const [availableYears, setAvailableYears] = useState<number[]>([]); 
  const [statusData, setStatusData] = useState<OrderStatusType[]>([]); 

  const { data, isLoading, isError } = useShowAllOrdersQuery();
  const orders = data?.data.orders || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#274982";
      case "processing":
        return "#4B0055";
      case "shipped":
        return "#7ED257";
      case "delivered":
        return "#00B189";
      case "canceled":
        return "#008197";
      default:
        return "#B7E3E0";
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      const years = Array.from(
        new Set(
          orders.map((order: any) => new Date(order.created_at).getFullYear())
        )
      ).sort((a, b) => a - b);
      setAvailableYears(years);
    }
  }, [orders]);

  useEffect(() => {
    if (orders.length > 0) {
      const filteredOrders = orders.filter((order: any) => {
        const orderYear = new Date(order.created_at).getFullYear();
        return orderYear === selectedYear;
      });

      const totalOrders = filteredOrders.length;
      const statusCounts: { [key: string]: number } = {};

      filteredOrders.forEach((order: any) => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
      });

      const calculatedStatusData = Object.entries(statusCounts).map(([key, value]) => ({
        id: key,
        title: key.charAt(0).toUpperCase() + key.slice(1),
        value: parseFloat(((value / totalOrders) * 100).toFixed(0)),
        color: getStatusColor(key),
      }));

      setStatusData(calculatedStatusData);
    }
  }, [orders, selectedYear]);

  if (isLoading) return <p>Loading Order Status...</p>;
  if (isError) return <p>Error fetching order data.</p>;

  return (
    <div className="order-status-card">
      <div className="mb-20">
        <label>Select Year </label>
        <Select
          value={selectedYear}
          onChange={(value) => setSelectedYear(value)}
          style={{ width: 120, marginLeft: 10 }}
        >
          {availableYears.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>

      <div className="order-status-content">
        <OrderStatusChart statusData={statusData} />
        <div className="order-status-list">
          {statusData.map((status) => (
            <OrderStatusCell key={status.id} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
