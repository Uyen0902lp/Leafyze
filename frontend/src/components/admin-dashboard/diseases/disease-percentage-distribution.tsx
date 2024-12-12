import React, { useState, useEffect } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Label } from "recharts";
import { useGetAllPredictionsQuery, useGetUserPredictionHistoryQuery } from "@/redux/api/diseaseApiSlice";
import { IPredictionHistory } from "@/types/prediction-history-d-t";

const COLORS = [
  "#ebf4e6",
  "#DCEED3",
  "#B1D9A5",
  "#6EAB69",
  "#3B763E",
  "#004f03",
  "#3A0647",
  "#6E2E7F",
  "#9172A6",
  "#BBA5CA",
  "#E2D5E7",
];

type DiseasePercentageDistributionProps = {
  isAdmin: boolean;
};

const DiseasePercentageDistribution: React.FC<DiseasePercentageDistributionProps> = ({ isAdmin }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      setUserId(storedUserId);
    }
  }, []);

  const { data, isLoading, isError } = isAdmin
    ? useGetAllPredictionsQuery()
    : useGetUserPredictionHistoryQuery(userId!);

  const predictions = (data?.data || []) as IPredictionHistory[];

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [diseaseData, setDiseaseData] = useState<{ name: string; value: number }[]>([]);
  const [totalPredictions, setTotalPredictions] = useState<number>(0);

  useEffect(() => {
    if (predictions.length > 0) {
      const filtered = predictions.filter((prediction) => {
        const predictionYear = new Date(prediction.predicted_time).getFullYear();
        return predictionYear === year;
      });

      const diseaseCounts: { [key: string]: number } = {};
      filtered.forEach((prediction) => {
        diseaseCounts[prediction.disease_name] = (diseaseCounts[prediction.disease_name] || 0) + 1;
      });

      const total = Object.values(diseaseCounts).reduce((acc, count) => acc + count, 0);
      setTotalPredictions(total);

      const chartData = Object.entries(diseaseCounts).map(([name, count]) => ({
        name,
        value: Math.round((count / total) * 100),
      }));

      const percentageSum = chartData.reduce((acc, item) => acc + item.value, 0);
      if (percentageSum !== 100) {
        const diff = 100 - percentageSum;
        chartData[1].value += diff;
      }

      setDiseaseData(chartData);
    }
  }, [predictions, year]);

  if (isLoading) return <p>Loading disease percentage...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <div>
      <div className="filter-container-dd">
        <label>Select Year</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[...new Set(predictions.map((prediction) => new Date(prediction.predicted_time).getFullYear()))]
            .sort()
            .map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={diseaseData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#4299E1"
          >
            {diseaseData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label
              position="center"
              content={({ viewBox }: any) => {
                const { cx, cy } = viewBox;
                return (
                  <>
                    <text
                      x={cx}
                      y={cy - 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontSize: "16px", fill: "#333", fontWeight: "bold" }}
                    >
                      {totalPredictions}
                    </text>
                    <text
                      x={cx}
                      y={cy + 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontSize: "14px", fill: "#999" }}
                    >
                      {totalPredictions === 1 ? "Prediction" : "Predictions"}
                    </text>
                  </>
                );
              }}
            />
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}%`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiseasePercentageDistribution;
