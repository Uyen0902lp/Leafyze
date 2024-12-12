'use client';
import React from "react";
import { useGetDiseasesListQuery } from "../../../redux/api/diseaseApiSlice";
import AppCard from "../component/app-card";
import DiseaseTable from "./disease-table";
import DiseasesStatistics from "./diseases-statistics";
import { IDiseaseInfo } from "@/types/disease-d-t";
import UserPredictionFrequency from "./disease-prediction-frequency";
import DiseasePercentageDistribution from "./disease-percentage-distribution";
import DiseaseAccuracyByYear from "./disease-accuracy-by-year";
import ProductTableWithChart from "./disease-product";
import DiseaseCarousel from "@/components/disease-carousel/disease-carousel";

const DiseasesListing: React.FC = () => {
  const { data, isLoading, error } = useGetDiseasesListQuery();

  const diseaseData: IDiseaseInfo[] =
    data?.data.map((disease: any) => ({
      id: disease.id,
      name: disease.name,
      pathogen: disease.pathogen,
      symptoms: disease.symptoms,
      conditions: disease.conditions,
      prevention: disease.prevention,
      is_healthy: disease.is_healthy === 1,
    })) || [];

  return (
    <div
      className="mt-30 mb-20 pl-25 pr-25 pt-30 pb-30"
      style={{ backgroundColor: "#f3efec", borderRadius: "8px", maxWidth: "100%", overflowX: "hidden", }}
    >
      {/* Diseases Statistics Section */}
      <div className="mb-15">
        <DiseasesStatistics />
      </div>

      <div className="mb-35">
        <DiseaseAccuracyByYear isAdmin={true} />
      </div>

      <div className="mb-35 row g-4">
        <div className="col-xl-3 col-lg-4">
          <AppCard title="Diseases Distribution">
            <DiseasePercentageDistribution isAdmin={true} />
          </AppCard>
        </div>
        <div className="col-xl-9 col-lg-8">
          <AppCard title="Diseases Prediction Frequency">
            <UserPredictionFrequency isAdmin={true} />
          </AppCard>
        </div>
      </div>

      <div className="mb-35">
        <AppCard title="Diseases Products Suggestion Overview">
          <ProductTableWithChart />
        </AppCard>
      </div>

      <div className="mb-35">
        <AppCard title="Diseases Gallery">
          <DiseaseCarousel />
        </AppCard>
      </div>

      {/* Diseases Listing Section */}
      <AppCard title="Diseases List">
        <div className="diseases-listing__table-wrapper">
          {isLoading ? (
            <p>Loading diseases...</p>
          ) : error ? (
            <p>
              {error &&
                ("status" in error
                  ? `Error ${error.status}: ${JSON.stringify(error.data)}`
                  : error.message)}
            </p>
          ) : (
            <DiseaseTable diseaseData={diseaseData} showActions={true} />
          )}
        </div>
      </AppCard>
    </div>
  );
};

export default DiseasesListing;
