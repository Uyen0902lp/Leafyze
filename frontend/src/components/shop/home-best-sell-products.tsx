import React from "react";
import Link from "next/link";
import { NextSmArrow, PrevSmArrow, ShapeLine } from "../svg";
import HomeBestSellSlider from "./home-best-sell-slider";
import { getBestSellingProducts } from "@/api/getProducts";


export default async function HomeBestSellProducts() {
  const bestSellPrdData = await getBestSellingProducts(6);
  return (
    <section className="tp-best-seller-area pt-110 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-7">
            <div className="tp-best-banner-5 p-relative mr-20">
              <div className="tp-best-banner-slider-active-5 swiper-container">
                <div className="tp-best-banner-item-5 p-relative fix">
                  <Link href="/shop">
                    <div
                      className="tp-best-banner-thumb-5 include-bg grey-bg"
                      style={{
                        backgroundImage:
                          "url(/assets/images/banner/5/best-banner-1.jpg)",
                      }}
                    ></div>
                  </Link>
                </div>
              </div>
              <div className="tp-best-banner-slider-dot-5 tp-swiper-dot"></div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7">
            <div className="tp-best-slider-wrapper-5">
              <div className="tp-section-title-wrapper-5 mb-35">
                <span className="tp-section-title-pre-5 has-mb-0">
                  More to Discover
                  <ShapeLine />
                </span>
                <h3 className="tp-section-title-5">Bestsellers of the week</h3>
              </div>
              <div className="tp-best-slider-5 p-relative">
                {/* best slider */}
                <HomeBestSellSlider products={bestSellPrdData?.data}/>
                {/* best slider */}
                <div className="tp-best-slider-arrow-5 d-none d-sm-block">
                  <button className="tp-best-slider-5-button-prev">
                    <PrevSmArrow />
                  </button>
                  <button className="tp-best-slider-5-button-next">
                    <NextSmArrow />
                  </button>
                </div>
              </div>
              <div className="tp-best-slider-dot-5 tp-swiper-dot mt-15 text-center d-sm-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
