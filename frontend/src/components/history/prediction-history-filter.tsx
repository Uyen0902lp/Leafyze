import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type IProps = {
  handleReset: () => void;
  selectedDisease: string;
  setSelectedDisease: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: 'newest' | 'oldest';
  setSortOrder: React.Dispatch<React.SetStateAction<'newest' | 'oldest'>>;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  diseaseCounts: { [key: string]: number };
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

export default function PredictionFilter({
  handleReset,
  selectedDisease,
  setSelectedDisease,
  sortOrder,
  setSortOrder,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  diseaseCounts,
}: IProps) {
  return (
    <div className="tp-shop-sidebar mr-10">
      {/* Date Range Filter */}
      <div className="tp-shop-widget mb-35">
        <h3 className="tp-shop-widget-title">Date Range</h3>
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

      {/* Disease Categories Filter */}
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>
              {diseaseOptions.map((item) => (
                <li key={item.id}>
                  <button
                    className={`pointer ${selectedDisease === item.value ? "active" : ""}`}
                    onClick={() => setSelectedDisease(item.value)}
                    style={{
                      color: selectedDisease === item.value ? "#678E61" : "#333",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "3px 10px",
                      fontSize: "14px",
                    }}
                  >
                    {item.label} <span>({diseaseCounts[item.id] || 0})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sort Order Filter */}
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Sort Order</h3>
        <div className="tp-shop-widget-content">
          <div className="row gx-2 tp-shop-widget-brand-list">
            <div className="col-md-6">
              <button
                className={`tp-shop-widget-brand-item w-100 mb-10 ${sortOrder === "newest" ? "active" : ""}`}
                onClick={() => setSortOrder("newest")}
                style={{
                  color: sortOrder === "newest" ? "#678E61" : "initial",
                  border: sortOrder === "newest" ? "1px solid #678E61" : "1px solid #000000",
                }}
              >
                Newest
              </button>
            </div>
            <div className="col-md-6">
              <button
                className={`tp-shop-widget-brand-item w-100 ${sortOrder === "oldest" ? "active" : ""}`}
                onClick={() => setSortOrder("oldest")}
                style={{
                  color: sortOrder === "oldest" ? "#678E61" : "initial",
                  border: sortOrder === "oldest" ? "1px solid #678E61" : "1px solid #000000",
                }}
              >
                Oldest
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Filter Button */}
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Reset Filter</h3>
        <button onClick={handleReset} className="tp-btn">
          Reset Filter
        </button>
      </div>
    </div>
  );
}
