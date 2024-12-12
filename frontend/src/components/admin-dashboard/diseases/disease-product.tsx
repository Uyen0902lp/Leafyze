import React, { useState, useEffect } from "react";
import { Table, Select } from "antd";
import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useGetAllPredictionsQuery } from "../../../redux/api/diseaseApiSlice";
import { IPredictionHistory } from "@/types/prediction-history-d-t";

const { Option } = Select;

const COLORS = ["#5cd4d6", "#10b2b2", "#b177dd", "#7848AB", "#571a93"];

const ProductTableWithChart = () => {
  const [selectedDisease, setSelectedDisease] = useState<number | null>(null);
  const [productFrequency, setProductFrequency] = useState<any[]>([]);
  const [productFrequencyPercent, setProductFrequencyPercent] = useState<any[]>([]);
  const [totalProductOccurrence, setTotalProductOccurrence] = useState<number>(0); // Total occurrences

  const { data, isLoading, error } = useGetAllPredictionsQuery();

  const predictions = (data?.data || []) as IPredictionHistory[];

  useEffect(() => {
    if (selectedDisease && predictions.length > 0) {
      const selectedPredictions = predictions.filter(
        (prediction) => prediction.disease_id === selectedDisease
      );

      const frequencyMap = selectedPredictions.flatMap(
        (prediction) => prediction.suggested_products
      ).reduce((acc: { [key: string]: { title: string; count: number } }, product) => {
        if (acc[product.title]) {
          acc[product.title].count += 1;
        } else {
          acc[product.title] = { title: product.title, count: 1 }; 
        }
        return acc;
      }, {});

      const frequencyData = Object.values(frequencyMap); 
      setProductFrequency(frequencyData);

      const totalOccurrences = frequencyData.reduce((sum, item) => sum + item.count, 0);
      setTotalProductOccurrence(totalOccurrences);

      const percentData = frequencyData.map((item) => ({
        title: item.title,
        count: item.count,
        percent: parseFloat(((item.count / totalOccurrences) * 100).toFixed(2)), 
        value: parseFloat(((item.count / totalOccurrences) * 100).toFixed(2)), 
      }));

      setProductFrequencyPercent(percentData);
    } else {
      setProductFrequency([]);
      setProductFrequencyPercent([]);
    }
  }, [selectedDisease, predictions]);

  const totalRow = {
    title: "Total",
    count: totalProductOccurrence,
  };

  const dataWithTotalRow = selectedDisease ? [...productFrequency, totalRow] : productFrequency;

  const columns = [
    { title: "Product Name", dataIndex: "title", key: "title" },
    {
      title: "Total Count",
      dataIndex: "count",
      key: "count",
      render: (text: any) => (
        <div style={{ textAlign: "center" }}>
          {text}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data. Please try again.</p>;
  }

  return (
    <div className="animation-u">
      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 16, fontWeight: 'bold' }}>Select Disease</label>
        <Select
          value={selectedDisease}
          onChange={(value) => setSelectedDisease(value)}
          style={{ width: 250 }}
          placeholder="Select a disease"
        >
          {Array.from(new Set(predictions.map((p) => p.disease_id))).map((id) => {
            const diseaseName = predictions.find((p) => p.disease_id === id)?.disease_name;
            return (
              <Option key={id} value={id}>
                {diseaseName}
              </Option>
            );
          })}
        </Select>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <Table
          dataSource={dataWithTotalRow} 
          columns={columns}
          rowKey="title"
          style={{ flex: 1 }}
          pagination={false}
        />

        <ResponsiveContainer width="60%" height={350}>
          <PieChart>
            <Pie
              data={productFrequencyPercent}
              dataKey="value" 
              nameKey="title"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label={(entry) => `${entry.title}`} 
            >
              {productFrequencyPercent.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductTableWithChart;
