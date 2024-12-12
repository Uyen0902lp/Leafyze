"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import shape_1 from "@/assets/images/slider/5/shape/shape-1.png";
import shape_2 from "@/assets/images/slider/5/shape/shape-2.png";
import shape_3 from "@/assets/images/slider/5/shape/shape-3.png";
import shape_4 from "@/assets/images/slider/5/shape/shape-4.png";
import subtitle from "@/assets/images/slider/5/subtitle.png";
import offer from "@/assets/images/slider/5/shape/offer.png";
import main_img from "@/assets/images/slider/5/slider-1.png";
import banner_right from "@/assets/images/slider/5/bannerightimg.png";
import shape_5 from "@/assets/images/slider/5/shape/shape_5.png";


export default function HeroBanner() {
  return (
    <section className="tp-slider-area p-relative z-index-1 fix animation-u">
      <div className="tp-slider-active-5s swiper-containers">
        <div className="swiper-wrappers">
          <div
            className="tp-slider-item-5 scene tp-slider-height-5 swiper-slide d-flex align-items-center"
            data-bg-color="#F3F3F3"
            style={{ backgroundColor: "#F3F3F3" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xxl-7 col-xl-7 col-lg-6">
                  <div className="tp-slider-content-5 p-relative z-index-1">
                    <h3 className="tp-slider-title-5">
                      DIAGNOSE PLANT DISEASES, <br />
                      SHOP REMEDIES INSTANTLY
                    </h3>

                    <div className="tp-slider-btn-5">
                      <Link href="/shop" className="tp-btn-green mr-10">
                        Shop Now
                      </Link>
                      <Link href="/detect" className="tp-btn-green mt-15">
                        Diagnose Plant
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-5 col-xl-5 col-lg-6">
                  <div className="tp-slider-thumb-wrapper-5 p-relative">
                    <div className="tp-slider-thumb-shape-5 one d-none d-sm-block layer">
                      <Image
                        data-depth="0.1"
                        className="offer"
                        src={offer}
                        alt="offer"
                      />
                    </div>
                    <div className="tp-slider-thumb-5 main-img layer">
                      <Image
                        data-depth="0.2"
                        className=""
                        src={banner_right}
                        alt="thumb"
                      />
                      <span className="tp-slider-thumb-5-gradient"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
