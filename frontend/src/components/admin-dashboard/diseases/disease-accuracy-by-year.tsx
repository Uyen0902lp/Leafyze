import React, { useEffect, useState } from "react";
import { Button } from "antd";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useGetAllPredictionsQuery, useGetUserPredictionHistoryQuery } from "../../../redux/api/diseaseApiSlice";
import { IPredictionHistory } from "../../../types/prediction-history-d-t";
import AppCard from "../component/app-card";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

type DiseaseChartData = {
    name: string;
    fullName: string;
    avgAccuracy: number;
};

const diseaseOptions = [
    { value: "Early Blight", label: "Early Blight", id: "1" },
    { value: "Late Blight", label: "Late Blight", id: "2" },
    { value: "Septoria Leaf Spot", label: "Septoria Leaf Spot", id: "3" },
    { value: "Bacterial Spot", label: "Bacterial Spot", id: "4" },
    { value: "Tomato Yellow Leaf Curl Virus", label: "Tomato Yellow Leaf Curl Virus", id: "5" },
    { value: "Target Spot", label: "Target Spot", id: "6" },
    { value: "Tomato Mosaic Virus", label: "Tomato Mosaic Virus", id: "7" },
    { value: "Leaf Mold", label: "Leaf Mold", id: "8" },
    { value: "Two-Spotted Spider Mites", label: "Two-Spotted Spider Mites", id: "9" },
    { value: "Powdery Mildew", label: "Powdery Mildew", id: "10" },
    { value: "Healthy", label: "Healthy", id: "11" },
];

type DiseaseAccuracyByYearProps = {
    isAdmin: boolean;
};

const DiseaseAccuracyByYear: React.FC<DiseaseAccuracyByYearProps> = ({ isAdmin }) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("user_id");
            setUserId(storedUserId);
        }
    }, []);

    const { data: predictionsData, isLoading, isError } = isAdmin
        ? useGetAllPredictionsQuery()
        : useGetUserPredictionHistoryQuery(userId!);

    const [diseaseStats, setDiseaseStats] = useState<DiseaseChartData[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState<number[]>([]);

    useEffect(() => {
        if (predictionsData && Array.isArray(predictionsData.data)) {
            const predictionHistory: IPredictionHistory[] = predictionsData.data;

            const years = Array.from(
                new Set(predictionHistory.map((prediction) => new Date(prediction.predicted_time).getFullYear()))
            ).sort((a, b) => a - b);
            setAvailableYears(years);

            const filteredPredictions = predictionHistory.filter(
                (prediction) => new Date(prediction.predicted_time).getFullYear() === selectedYear
            );

            const stats: DiseaseChartData[] = diseaseOptions.map((option) => {
                const diseasePredictions = filteredPredictions.filter(
                    (prediction) => prediction.disease_id.toString() === option.id
                );

                const avgAccuracy =
                    diseasePredictions.length > 0
                        ? (diseasePredictions.reduce((acc, curr) => acc + curr.accuracy, 0) /
                            diseasePredictions.length) *
                        100
                        : 0;

                const shortName = option.label
                    .split(" ")
                    .map((word) => word[0])
                    .join("");

                return {
                    name: shortName,
                    fullName: option.label,
                    avgAccuracy: parseFloat(avgAccuracy.toFixed(5)),
                };
            });

            setDiseaseStats(stats);
        }
    }, [predictionsData, selectedYear]);

    const getDataForExport = () => {
        return diseaseStats.map((data) => ({
            Disease: data.fullName,
            AverageAccuracy: data.avgAccuracy.toFixed(5),
        }));
    };

    const exportToExcel = () => {
        const sheetData = getDataForExport();
        const ws = XLSX.utils.json_to_sheet(sheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `Disease Accuracy ${selectedYear}`);

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(file, `Disease_Accuracy_${selectedYear}.xlsx`);
    };

    if (isLoading) return <p>Loading data...</p>;
    if (isError) return <p>Error loading data.</p>;

    return (
        <AppCard title="Disease Accuracy by Year">
            <div className="filter-container-dd" style={{ marginBottom: 20 }}>
                <label style={{ marginRight: 10 }}>Select Year:</label>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                    {availableYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                    data={diseaseStats}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                        labelFormatter={(label) => {
                            const disease = diseaseStats.find((stat) => stat.name === label);
                            return disease ? disease.fullName : label;
                        }}
                        formatter={(value: number) => [`${parseFloat(value.toFixed(5))}%`, "Average Accuracy"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="avgAccuracy"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />
                </AreaChart>
            </ResponsiveContainer>

            <Button onClick={exportToExcel} style={{ marginTop: 20 }}>
                Export to Excel
            </Button>
        </AppCard>
    );
};

export default DiseaseAccuracyByYear;
