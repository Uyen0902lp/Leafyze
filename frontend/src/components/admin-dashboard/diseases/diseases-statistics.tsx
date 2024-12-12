import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetAllPredictionsQuery } from '../../../redux/api/diseaseApiSlice';
import { IPredictionHistory } from '../../../types/prediction-history-d-t';
import AppCard from '../component/app-card';
import StateCard from "../component/state-card";

type DiseaseChartData = {
  name: string;
  avgAccuracy: number;
  predictedCount: number;
};

const diseaseOptions = [
  { value: 'all', label: 'All', id: 'all' },
  { value: 'Early Blight', label: 'Early Blight', id: '1' },
  { value: 'Late Blight', label: 'Late Blight', id: '2' },
  { value: 'Septoria Leaf Spot', label: 'Septoria Leaf Spot', id: '3' },
  { value: 'Bacterial Spot', label: 'Bacterial Spot', id: '4' },
  { value: 'Tomato Yellow Leaf Curl Virus', label: 'Tomato Yellow Leaf Curl Virus', id: '5' },
  { value: 'Target Spot', label: 'Target Spot', id: '6' },
  { value: 'Tomato Mosaic Virus', label: 'Tomato Mosaic Virus', id: '7' },
  { value: 'Leaf Mold', label: 'Leaf Mold', id: '8' },
  { value: 'Two-Spotted Spider Mites', label: 'Two-Spotted Spider Mites', id: '9' },
  { value: 'Powdery Mildew', label: 'Powdery Mildew', id: '10' },
  { value: 'Healthy', label: 'Healthy', id: '11' },
];

const DiseasesStatistics = () => {
  const { data: predictionsData } = useGetAllPredictionsQuery();
  const [diseaseStats, setDiseaseStats] = useState<DiseaseChartData[]>([]);
  const [filteredCounts, setFilteredCounts] = useState<DiseaseChartData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Generate all stats (for chart)
  useEffect(() => {
    if (predictionsData && Array.isArray(predictionsData.data)) {
      const predictionHistory: IPredictionHistory[] = predictionsData.data;

      const stats: DiseaseChartData[] = diseaseOptions
        .filter((option) => option.value !== 'all')
        .map((option) => {
          const diseasePredictions = predictionHistory.filter(
            (prediction) => prediction.disease_id.toString() === option.id
          );

          const avgAccuracy =
            diseasePredictions.length > 0
              ? (diseasePredictions.reduce((acc, curr) => acc + curr.accuracy, 0) /
                diseasePredictions.length) *
              100
              : 0;

          return {
            name: option.label,
            avgAccuracy: parseFloat(avgAccuracy.toFixed(5)),
            predictedCount: diseasePredictions.length,
          };
        });

      setDiseaseStats(stats);
      setFilteredCounts(stats);
    }
  }, [predictionsData]);

  // Apply date filter (for the table only)
  useEffect(() => {
    if (predictionsData && Array.isArray(predictionsData.data)) {
      const predictionHistory: IPredictionHistory[] = predictionsData.data;

      const filtered = diseaseStats.map((stat) => {
        const diseasePredictions = predictionHistory.filter((prediction) => {
          const predictionDate = new Date(prediction.predicted_time);
          return (
            (startDate ? predictionDate >= startDate : true) &&
            (endDate ? predictionDate <= endDate : true) &&
            prediction.disease_name === stat.name
          );
        });

        return {
          ...stat,
          predictedCount: diseasePredictions.length,
        };
      });

      setFilteredCounts(filtered);
    }
  }, [startDate, endDate, diseaseStats, predictionsData]);

  // Reset filter
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredCounts(diseaseStats);
  };

  return (
    <div className="row">
      {/* Left Column (Chart) */}
      <div className="col-md-8 col-lg-8 mb-20 disease-chart">
        <AppCard title="Disease Prediction Accuracy Overview">
          <ResponsiveContainer width="100%" height={570}>
            <BarChart layout="vertical" data={diseaseStats} barCategoryGap="10%" barSize={30}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(tick) => `${tick}%`}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value: number, name: string) => [`${value.toFixed(5)}%`, 'Average Accuracy']}
              />
              <Bar dataKey="avgAccuracy" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </AppCard>

        {/* State Summary Section */}
        <div className="row state-summary-section mt-30">
          <div className="col-md-4 mb-20">
            <StateCard
              data={{
                title: "High Accuracy",
                value: diseaseStats.filter((disease) => disease.avgAccuracy > 90).length,
                growth: 0,
                icon: "high-accuracy",
                color: "#29A8AB",
              }}
            />
          </div>
          <div className="col-md-4 mb-20">
            <StateCard
              data={{
                title: "Class Count",
                value: diseaseStats.length,
                growth: 0,
                icon: "class-count",
                color: "#678E61",
              }}
            />
          </div>
          <div className="col-md-4 mb-20">
            <StateCard
              data={{
                title: "Total Predictions",
                value: diseaseStats.reduce((acc, disease) => acc + disease.predictedCount, 0),
                growth: 0,
                icon: "total-predictions",
                color: "#42603D",
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Column (Table) */}
      <div className="col-md-4 col-lg-4 mb-15 disease-filter">
        <AppCard title="Disease Prediction Count and Filter">
          {/* Filter Section */}
          <div className="filter-section mb-3">
            <div className="date-range-filter mb-2">
              <h6>Date Range</h6>
              <div className="tp-shop-widget-content date-filter">
                <div className="date-picker-wrapper">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    placeholderText="Start Date"
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                </div>
                <div className="date-picker-wrapper">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    minDate={startDate || undefined}
                    placeholderText="End Date"
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleReset} style={{ backgroundColor: '#678E61' }}>
              Reset Filter
            </button>
          </div>

          {/* Prediction Count Table */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Disease Name</th>
                <th>Prediction Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredCounts.map((disease) => (
                <tr key={disease.name}>
                  <td>{disease.name}</td>
                  <td className='text-center'>{disease.predictedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AppCard>
      </div>
    </div>
  );
};

export default DiseasesStatistics;
