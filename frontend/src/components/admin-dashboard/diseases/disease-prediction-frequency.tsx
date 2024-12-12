import React, { useState, useEffect } from "react";
import { Select } from "antd";
import StaticsGraph from "./StaticsGraph";
import { useGetAllPredictionsQuery, useGetUserPredictionHistoryQuery } from "@/redux/api/diseaseApiSlice";
import { IPredictionHistory } from "@/types/prediction-history-d-t";

const { Option } = Select;

type UserPredictionFrequencyProps = {
    isAdmin: boolean;
};

const UserPredictionFrequency: React.FC<UserPredictionFrequencyProps> = ({ isAdmin }) => {
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

    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [graphData, setGraphData] = useState<{ month: string; number: number }[]>([]);

    useEffect(() => {
        if (predictions.length > 0) {
            const years = Array.from(
                new Set(predictions.map((prediction) => new Date(prediction.predicted_time).getFullYear()))
            ).sort((a, b) => a - b);

            setAvailableYears(years);

            const currentYear = new Date().getFullYear();
            const defaultYear = years.includes(currentYear) ? currentYear : years[0];
            setSelectedYear(defaultYear);
        }
    }, [predictions]);

    useEffect(() => {
        if (selectedYear) {
            const filteredPredictions = predictions.filter((prediction) => {
                const date = new Date(prediction.predicted_time);
                return date.getFullYear() === selectedYear;
            });

            const months = Array.from({ length: 12 }, (_, i) =>
                new Date(2000, i).toLocaleString("default", { month: "long" })
            );

            const frequencyData = months.map((month, index) => {
                const monthNumber = index + 1;
                return {
                    month,
                    number: filteredPredictions.filter((prediction) => {
                        const date = new Date(prediction.predicted_time);
                        return date.getMonth() + 1 === monthNumber;
                    }).length,
                };
            });

            setGraphData(frequencyData);
        }
    }, [selectedYear, predictions]);

    if (isLoading) return <p>Loading prediction frequency...</p>;
    if (isError) return <p>Error loading data.</p>;

    return (
        <div>
            <div className="filter-container-pf">
                <label className="filter-label">Select Year</label>
                <Select
                    className="filter-select"
                    value={selectedYear}
                    onChange={(value) => setSelectedYear(value)}
                    style={{ width: 120 }}
                >
                    {availableYears.map((year) => (
                        <Option key={year} value={year}>
                            {year}
                        </Option>
                    ))}
                </Select>
            </div>

            <StaticsGraph data={graphData} />
        </div>
    );
};

export default UserPredictionFrequency;
