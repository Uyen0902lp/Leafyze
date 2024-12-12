import React from "react";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StaticsGraphProps = {
  data: {
    month: string;
    number: number;
  }[];
};

const StaticsGraph: React.FC<StaticsGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <AreaChart data={data} margin={{ top: 25, right: 20, left: 0, bottom: 0 }}>
        {/* Gradient Background */}
        <defs>
          <linearGradient id="colorFrequency" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          padding={{ left: 30, right: 30 }}
          interval={0}
        />

        {/* Tooltip */}
        <Tooltip labelStyle={{ color: "black" }} />

        {/* Cartesian Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />

        <Area
          type="monotone"
          dataKey="number"
          stroke="#8884d8"
          strokeWidth={2} 
          fillOpacity={1}
          fill="url(#colorFrequency)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StaticsGraph;
