"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGetUserPredictionHistoryQuery } from "@/redux/api/diseaseApiSlice";
import Image from "next/image";
import { IPredictionHistory } from "@/types/prediction-history-d-t";
import ProductItem from '@/components/shop/product-item';
import { IProduct } from "@/types/product-d-t";
import Loader from "../loader/loader";
import Pagination from "../ui/pagination";
import PredictionFilter from "./prediction-history-filter";
import noHistoryImg from "@/assets/images/error/questions-bro.png";
import loginImage from "@/assets/images/error/search-rafiki.png";

type Option = {
  value: string;
  label: string;
};

export default function PredictionHistory() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const userId: string = typeof window !== "undefined" ? localStorage.getItem("user_id") || "" : "";
  const { data, isLoading } = useGetUserPredictionHistoryQuery(userId);

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedDisease, setSelectedDisease] = useState("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<IPredictionHistory[]>([]);
  const [diseaseCounts, setDiseaseCounts] = useState<{ [key: string]: number }>({ all: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const storageKey = `predictionHistory_${userId}`;
  const removedItemsKey = `removedItems_${userId}`;
  const lastRemoveTimestampKey = `lastRemoveTimestamp_${userId}`;

  useEffect(() => {
    if (!userId) {
      setIsLoggedIn(false);
    }
  }, [userId]);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (isLoggedIn && data?.data) {
      const removedItems = JSON.parse(localStorage.getItem(removedItemsKey) || "[]");
      const initialData: IPredictionHistory[] = Array.isArray(data.data) ? data.data : [];
      const filteredData = initialData.filter((item) => !removedItems.includes(item.id));
      setPredictionHistory(filteredData);
      setDiseaseCounts(calculateDiseaseCounts(filteredData, removedItems));
    }
  }, [isLoggedIn, data]);

  const calculateDiseaseCounts = useCallback((history: IPredictionHistory[], removedItems: number[]) => {
    const counts: { [key: string]: number } = { all: 0 };
    history.forEach((item) => {
      const diseaseId = item.disease_id;
      if (diseaseId && !removedItems.includes(item.id)) {
        counts[diseaseId] = (counts[diseaseId] || 0) + 1;
        counts.all += 1;
      }
    });
    return counts;
  }, []);

  const filteredHistory = predictionHistory.filter((item) =>
    (selectedDisease === "all" || item.disease_name === selectedDisease) &&
    (!startDate || new Date(item.predicted_time) >= startDate) &&
    (!endDate || new Date(item.predicted_time) <= endDate)
  );

  const sortedHistory = [...filteredHistory].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.predicted_time).getTime() - new Date(a.predicted_time).getTime()
      : new Date(a.predicted_time).getTime() - new Date(b.predicted_time).getTime()
  );

  const paginatedHistory = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return sortedHistory.slice(start, start + itemsPerPage);
  }, [sortedHistory, currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleSorting = (item: Option) => {
    setSortOrder(item.value === "newest" ? "newest" : "oldest");
  };

  const handleFilterReset = () => {
    setSelectedDisease("all");
    setSortOrder("newest");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(0);
  };

  const navigateToDiagnose = () => {
    router.push("/detect");
  };

  const navigateToProductDetail = (slug: string) => {
    router.push(`/shop-details/${slug}`);
  };

  const toggleOverlay = (id: string | number) => {
    if (window.innerWidth <= 992) {
      const element = document.getElementById(`card-${id}`);
      if (element) {
        element.classList.toggle("show-overlay");
      }
    }
  };

  const removeCard = (id: number) => {
    const removedItems = JSON.parse(localStorage.getItem(removedItemsKey) || "[]");
    if (!removedItems.includes(id)) {
      removedItems.push(id);
      localStorage.setItem(removedItemsKey, JSON.stringify(removedItems));
    }
    const updatedHistory = predictionHistory.filter((item) => item.id !== id);
    setPredictionHistory(updatedHistory);
    setDiseaseCounts(calculateDiseaseCounts(updatedHistory, removedItems));
  };

  const removeAllCards = () => {
    const currentTimestamp = Date.now();
    localStorage.setItem(lastRemoveTimestampKey, currentTimestamp.toString());
    localStorage.removeItem(removedItemsKey);
    setPredictionHistory([]);
    setDiseaseCounts({ all: 0 });
  };

  if (isLoading) {
    return (
      <div className="mt-200 mb-200">
        <Loader loading={true} />
      </div>
    );
  }

  return (
    <section className="tp-prediction_history">
      {/* Breadcrumb area (always visible) */}
      <section className="breadcrumb__area include-bg text-center pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3 className="breadcrumb__title">Diagnosis History</h3>
                <div className="breadcrumb__list">
                  <span>
                    <a href="#">Home</a>
                  </span>
                  <span>History</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!isLoggedIn ? (
        <div className="container text-center">
          <Image src={loginImage} alt="Please log in" width={310} height={360}/>
          <h4 className="mt-35">You need to log in to view your prediction history.</h4>
          <button className="tp-detect-field-button mt-40 mb-60" onClick={handleLoginRedirect}>
            Go to Login
          </button>
        </div>
      ) : (
        <div className="container pb-30 animation-u">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <PredictionFilter
                selectedDisease={selectedDisease}
                setSelectedDisease={setSelectedDisease}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                handleReset={handleFilterReset}
                diseaseCounts={diseaseCounts}
              />
            </div>

            {/* Main Content */}
            <div className="col-xl-9 col-lg-8 mt-5">
              <div className="tp-shop-top-result mb-50">
                <p>
                  {sortedHistory.length > 0
                    ? `Showing ${currentPage * itemsPerPage + 1}–${Math.min(
                        (currentPage + 1) * itemsPerPage,
                        sortedHistory.length
                      )} of ${sortedHistory.length} results`
                    : "Showing 0–0 of 0 results"}
                </p>
              </div>

              {sortedHistory.length === 0 ? (
                <div className="tp-prediction_history-no-history mt-20">
                  <Image src={noHistoryImg} alt="No History" width={310} height={353} />
                  <h3 className="mt-50">No Prediction History Found</h3>
                  <button onClick={navigateToDiagnose} className="tp-detect-field-button">
                    Diagnose Plant
                  </button>
                </div>
              ) : (
                <div className="tp-prediction_history-cards">
                  {paginatedHistory.map((item: IPredictionHistory) => (
                    <div
                      key={item.id}
                      id={`card-${item.id}`}
                      className="tp-prediction_history-card"
                      onClick={() => toggleOverlay(item.id)}
                    >
                      <Image
                        src={item.image_url}
                        alt="Disease image"
                        width={306}
                        height={450}
                        objectFit="cover"
                        className="tp-prediction_history-card-image"
                      />

                      <div
                        className="remove-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCard(item.id);
                        }}
                      >
                        <span>✗ Remove</span>
                      </div>

                      <div className="tp-prediction_history-card-overlay">
                        {item.disease_name === "Healthy" ? (
                          <>
                            <p className="tp-prediction_history-card-overlay-healthy">
                              🌿 The leaf is completely healthy. 🎉🎉🎉
                            </p>
                            <p className="tp-prediction_history-card-overlay-text">
                              🎯 <strong>Accuracy:</strong> {(item.accuracy * 100).toFixed(5)}%
                            </p>
                            <p className="tp-prediction_history-card-overlay-text">
                              🗓️ <strong>Predicted time:</strong> {new Date(item.predicted_time).toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="tp-prediction_history-card-overlay-text">
                              💉 <strong>Disease:</strong> {item.disease_name}
                            </p>
                            <p className="tp-prediction_history-card-overlay-text">
                              🎯 <strong>Accuracy:</strong> {(item.accuracy * 100).toFixed(5)}%
                            </p>
                            <p className="tp-prediction_history-card-overlay-text">
                              🗓️ <strong>Predicted time:</strong> {new Date(item.predicted_time).toLocaleString()}
                            </p>

                            {/* Suggested Products Section */}
                            <div className="tp-prediction_history-card-overlay-products">
                              <h4>Suggested Products:</h4>
                              <ul>
                                {item.suggested_products.map((product) => (
                                  <li
                                    key={product.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigateToProductDetail(product.slug);
                                    }}
                                  >
                                    ✨ {product.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="tp-shop-pagination mt-35">
                <div className="tp-pagination">
                  <Pagination
                    handlePageClick={(event) => handlePageClick(event.selected)}
                    pageCount={Math.ceil(sortedHistory.length / itemsPerPage)}
                  />
                </div>
              </div>

              {/* Remove All & Diagnose Plant Buttons */}
              {sortedHistory.length > 0 && (
                <div className="tp-shop-top-select mt-35 d-flex justify-content-center">
                  <button onClick={removeAllCards} className="tp-prediction_history-btn-remove mr-20">
                    Remove All
                  </button>
                  <button onClick={navigateToDiagnose} className="tp-prediction_history-btn">
                    Diagnose Plant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
