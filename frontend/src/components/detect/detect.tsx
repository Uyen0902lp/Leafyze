'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode, Thumbs, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { IDisease } from '@/types/disease-d-t';
import { usePredictDiseaseMutation } from '@/redux/api/diseaseApiSlice';
import ProductItem from '@/components/shop/product-item';
import { IProduct } from "@/types/product-d-t";
import { UploadField } from './detect-upload-field';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import loginImage from '@/assets/images/error/login-bro.png';

export default function DiseaseAnalysis() {
  const router = useRouter(); 
  const toastShownRef = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<IDisease | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [predictDisease] = usePredictDiseaseMutation();

  const sliderNavData = ['Disease', 'Pathogen', 'Symptoms', 'Conditions', 'Prevention'];

  const handleClick = () => {
    window.location.href = '/history';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      await analyzeDisease(selectedFile);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const analyzeDisease = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error("User ID not found. Please log in first.");
      return;
    }
    formData.append('user_id', userId);

    try {
      const response = await predictDisease(formData).unwrap();
      // console.log("API response data:", response);

      if (response.data.diseaseInfo.name === "Healthy") {
        setAnalysisResult({
          diseaseName: "Healthy",
          accuracy: parseFloat(response.data.accuracy),
          pathogen: "",
          symptoms: "",
          conditions: "",
          prevention: "",
          suggestedProducts: [],
        });
      } else {
        setAnalysisResult({
          diseaseName: response.data.diseaseInfo.name,
          accuracy: parseFloat(response.data.accuracy),
          pathogen: response.data.diseaseInfo.pathogen,
          symptoms: response.data.diseaseInfo.symptoms,
          conditions: response.data.diseaseInfo.conditions,
          prevention: response.data.diseaseInfo.prevention,
          suggestedProducts: response.data.suggestedProducts,
        });
      }
    } catch (error) {
      console.error("Error fetching disease analysis:", error);
    }
  };

  //not work yet 
  const splitContent = (text: string): JSX.Element[] => {
    return text.split(/\n\n/).map((part: string, index: number) => (
      <p key={index}>{part}</p>
    ));
  };

  const getActiveContent = () => {
    if (!analysisResult) return '';

    if (analysisResult.diseaseName === "Healthy") {
      return (
        <div>
          <div className="tp-detect-healthy-message">
            The leaf is completely healthy. 🎉🎉🎉
          </div>
          <span className='tp-detect-healthy-message accuracy'><strong>Accuracy:</strong> {analysisResult.accuracy}%</span>
        </div>
      );
    }

    switch (activeSlide) {
      case 0:
        return (
          <div>
            <span><strong>Disease:</strong> {analysisResult.diseaseName}</span>
            <br />
            <span><strong>Accuracy:</strong> {analysisResult.accuracy}%</span>
          </div>
        );
      case 1: return splitContent(analysisResult.pathogen);
      case 2: return splitContent(analysisResult.symptoms);
      case 3: return splitContent(analysisResult.conditions);
      case 4: return splitContent(analysisResult.prevention);
      default: return '';
    }
  };

  return (
    <section className="tp-history-area pt-90 pb-60">
      {/* breadcrumb area */}
      <section className="breadcrumb__area include-bg text-center pt-10 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3 className="breadcrumb__title">Diagnose Plant Diseases</h3>
                <div className="breadcrumb__list">
                  <span>
                    <a href="#">Home</a>
                  </span>
                  <span>Detect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!isLoggedIn ? (
        <div className="container text-center">
          <Image src={loginImage} alt="No History" width={306} height={360} />
          <h4 className='mt-40'>You need to log in to diagnose your plant.</h4>
          <button className="tp-detect-field-button mt-40" onClick={handleLoginRedirect}>
            Go to Login
          </button>
        </div>
      ) : (
        <>
          <div className="container">
            {!file && !analysisResult && (
              <UploadField
                onFileSelect={async (selectedFile) => {
                  setFile(selectedFile);
                  await analyzeDisease(selectedFile);
                }}
              />
            )}
            {file && analysisResult && (
              <>
                {/* Diagnosis Result Content */}
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tp-history-slider mb-50">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Thumbs, EffectFade]}
                        effect="fade"
                        className="tp-history-slider-active swiper-container"
                        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                      >
                        <SwiperSlide>
                          <div className="row">
                            <div className="col-xl-5 col-lg-6 col-md-6">
                              <div className="tp-history-wrapper pr-45">
                                <div className="tp-history-content mb-40">
                                  <h3 className="tp-detect-title">Prediction Result</h3>
                                  <p>{getActiveContent()}</p>
                                </div>
                                <div className="tp-history-year">
                                  {analysisResult?.diseaseName !== "Healthy" && <p>{sliderNavData[activeSlide]}</p>}
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-7 col-lg-6 col-md-6">
                              <div className="tp-history-thumb-wrapper ml-150 p-relative">
                                <div className="tp-history-thumb-text">
                                  <p>{analysisResult.diseaseName}</p>
                                </div>
                                <div className="tp-history-thumb m-img">
                                  <Image src={URL.createObjectURL(file)} alt="Uploaded Image" width={580} height={380} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                </div>
  
                {analysisResult.diseaseName !== "Healthy" && (
                  <div className="tp-history-nav">
                    <div className="row">
                      <div className="col-xl-12">
                        <Swiper
                          className="tp-history-nav-active swiper-container"
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={5}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Thumbs]}
                          onClick={(swiper) => setActiveSlide(swiper.clickedIndex)}
                        >
                          {sliderNavData.map((item, i) => (
                            <SwiperSlide key={i} className="tp-history-nav-year">
                              <p>{item}</p>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                )}
  
                {file && analysisResult && analysisResult.diseaseName !== "Healthy" && (
                  <div>
                    <h3 className="tp-detect-title">Suggested Products</h3>
                    <div className="row">
                      {analysisResult.suggestedProducts.map((product: IProduct) => (
                        <div className="col-md-4" key={product.id}>
                          <ProductItem product={product} disableLink={true} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                <div className="tp-detect-buttons">
                  <label className="tp-detect-field-button">
                    Select New File
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/png, image/jpg, image/jpeg, image/webp"
                      className="upload-input"
                      style={{ display: "none" }}
                    />
                  </label>
  
                  <button className="tp-detect-field-button" onClick={handleClick}>
                    Prediction History
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );  
}