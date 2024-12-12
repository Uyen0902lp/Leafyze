"use client";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useShowAllOrdersQuery } from "@/redux/api/orderApiSlice";
import { IOrderResponse } from "@/types/order-d-t";

const SalesChart = () => {
  const { data, isLoading, isError } = useShowAllOrdersQuery();
  const [salesData, setSalesData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      const years = new Set(
        data.data.orders.map((order) => new Date(order.created_at).getFullYear())
      );

      const sortedYears = Array.from(years).sort((a, b) => a - b);
      setAvailableYears(sortedYears);

      const salesByMonth = Array.from({ length: 12 }, () => ({ canceled: 0, delivered: 0 }));

      data.data.orders.forEach((order: IOrderResponse) => {
        const orderDate = new Date(order.created_at);
        const orderMonth = orderDate.getMonth();
        const orderYear = orderDate.getFullYear();

        if (orderYear === selectedYear) {
          if (order.status === "canceled") {
            salesByMonth[orderMonth].canceled += 1;
          } else if (order.status === "delivered") {
            salesByMonth[orderMonth].delivered += 1;
          }
        }
      });

      const updatedSalesData = salesByMonth.map((data, index) => ({
        month: index + 1,
        canceled: data.canceled,
        delivered: data.delivered,
      }));

      setSalesData(updatedSalesData);
    }
  }, [data, selectedYear]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div>
      <div className="filter-container">
        <label htmlFor="year-select" className="filter-label">
          Select Year
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="filter-select"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={salesData} margin={{ top: 15, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 1" horizontal={true} vertical={false} />
          <XAxis dataKey="month" />
          <Tooltip
            labelStyle={{ color: "black" }}
            contentStyle={{ borderRadius: 12, borderColor: "#31354188", background: "#FFFFFFCA" }}
          />
          <Bar stackId="a" dataKey="canceled" fill="#BA98F9" barSize={8} />
          <Bar stackId="a" dataKey="delivered" fill="#93D08A" barSize={8} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
