"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import ProductItem from "./product-item";
import { SwiperOptions } from "swiper/types";
import { IProduct } from "@/types/product-d-t";


const slider_setting: SwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 24,
  pagination: {
    el: ".tp-best-slider-dot-5",
    clickable: true,
  },
  navigation: {
    nextEl: ".tp-best-slider-5-button-next",
    prevEl: ".tp-best-slider-5-button-prev",
  },
  breakpoints: {
    "1200": {
      slidesPerView: 3,
    },
    "992": {
      slidesPerView: 2,
    },
    "768": {
      slidesPerView: 2,
    },
    "576": {
      slidesPerView: 2,
    },
    "0": {
      slidesPerView: 1,
    },
  },
};

type IProps = {
  products: IProduct[];
};

export default function HomeBestSellSlider({ products }: IProps) {
  return (
    <Swiper
      {...slider_setting}
      modules={[Pagination, Navigation]}
      className="tp-best-slider-active-5 swiper-container"
    >
      {products.map((item) => (
        <SwiperSlide key={item.id} className="tp-best-item-5">
          <ProductItem product={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
