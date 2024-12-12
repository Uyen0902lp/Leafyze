"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { Scrollbar, Pagination, Navigation } from "swiper/modules";
import { ICategory } from "@/types/category-d-t";
import { useRouter } from "next/navigation";

const slider_setting: SwiperOptions = {
  slidesPerView: 5,
  spaceBetween: 12,
  pagination: {
    el: ".tp-category-slider-dot-4",
    clickable: true,
  },
  navigation: {
    nextEl: ".tp-category-slider-button-next-5",
    prevEl: ".tp-category-slider-button-prev-5",
  },
  scrollbar: {
    el: ".tp-category-5-swiper-scrollbar",
    draggable: true,
    dragClass: "tp-swiper-scrollbar-drag",
    snapOnRelease: true,
  },

  breakpoints: {
    "1400": {
      slidesPerView: 5,
    },
    "1200": {
      slidesPerView: 5,
    },
    "992": {
      slidesPerView: 4,
    },
    "768": {
      slidesPerView: 3,
    },
    "576": {
      slidesPerView: 2,
    },
    "400": {
      slidesPerView: 2,
    },
    "0": {
      slidesPerView: 1,
    },
  },
};

//   type
type IProps = {
  categories: ICategory[];
};
export default function CategorySlider({ categories }: IProps) {
  const router = useRouter();
  function handleCategory (slug:string) {
    router.push(`/shop?parentCategory=${slug}`)
  }
  return (
    <Swiper
      {...slider_setting}
      modules={[Scrollbar, Pagination, Navigation]}
      className="tp-category-slider-active-5 swiper-container mb-50"
    >
      {categories.map((item) => (
        <SwiperSlide
          key={item.id}
          className="tp-category-item-5 p-relative z-index-1 fix"
        >
          <a className="pointer" onClick={()=> handleCategory(item.slug)}>
            <div
              className="tp-category-thumb-5 include-bg"
              style={{
                backgroundImage:
                  item.image &&
                  `url(${item.image})`,
              }}
            ></div>
            <div className="tp-category-content-5">
              <h3 className="tp-category-title-5">{item.title}</h3>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
