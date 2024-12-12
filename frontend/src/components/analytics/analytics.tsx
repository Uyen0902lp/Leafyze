'use client';
import React from 'react';
import DiseaseAccuracyByYear from '../admin-dashboard/diseases/disease-accuracy-by-year';
import AppCard from '../admin-dashboard/component/app-card';
import DiseasePercentageDistribution from '../admin-dashboard/diseases/disease-percentage-distribution';
import UserPredictionFrequency from '../admin-dashboard/diseases/disease-prediction-frequency';

export default function Analytics() {
    return (
        <div>
            <h4 className="mt-30 text-center">Prediction Data Visualization</h4>
            <div className="mt-20 pl-25 pr-25 pt-30 pb-30" style={{ backgroundColor: "#F3EFEC", borderRadius: "8px", maxWidth: "100%", overflowX: "hidden", }}>
                <DiseaseAccuracyByYear isAdmin={false} />

                <div className="mt-15 row g-4">
                    <div className="col-xl-3 col-lg-4">
                        <AppCard title="Diseases Distribution">
                            <DiseasePercentageDistribution isAdmin={false} />
                        </AppCard>
                    </div>

                    <div className="col-xl-9 col-lg-8">
                        <AppCard title="Diseases Prediction Frequency">
                            <UserPredictionFrequency isAdmin={false} />
                        </AppCard>
                    </div>
                </div>
            </div>
        </div>
    );
}