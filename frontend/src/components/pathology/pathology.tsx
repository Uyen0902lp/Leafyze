'use client';
import React from 'react';
import { useGetDiseasesListQuery } from "../../redux/api/diseaseApiSlice";
import { IDiseaseInfo } from "@/types/disease-d-t";
import DiseaseTable from "../admin-dashboard/diseases/disease-table";
import AppCard from '../admin-dashboard/component/app-card';
import DiseaseCarousel from '../disease-carousel/disease-carousel';

export default function Pathology() {

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
        <div>
            <section className="breadcrumb__area include-bg text-center pt-30 pb-20">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="breadcrumb__content p-relative z-index-1">
                                <h3 className="breadcrumb__title">Pathologies</h3>
                                <div className="breadcrumb__list">
                                    <span>
                                        <a href="#">Home</a>
                                    </span>
                                    <span>Pathology</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-20 pl-25 pr-25 pt-30 pb-30" style={{ backgroundColor: "#F2EDF7", borderRadius: "8px", maxWidth: "100%", overflowX: "hidden" }}>
                <AppCard title="Diseases Gallery">
                    <DiseaseCarousel/>
                </AppCard>

                <div className='mt-30'>
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
                                <DiseaseTable diseaseData={diseaseData} showActions={false} />
                            )}
                        </div>
                    </AppCard>
                </div>
            </div>
        </div>
    );
}
