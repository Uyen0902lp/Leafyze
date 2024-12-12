"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, EffectFade } from "swiper/modules";
import Image from "next/image";

// slider data
const slider_data = [
  {
    title: "About our <br> Online Store",
    subtitle_1:
      "In 2020, Leafyze was founded with a simple mission: to bring natural, eco-friendly solutions to plant care. Our journey began with a small team of botanists and enthusiasts dedicated to sustainable growth.",
    subtitle_2:
      "Discover the start of our journey and what we stand for!",
    img: "/assets/images/banner/b1-1.jpg",
    thumb_text: "Welcome to <br> Leafyze",
    year: 2020,
  },
  {
    title: "Expanding Our Reach",
    subtitle_1:
      "By 2021, we had expanded our offerings, building partnerships with renowned plant health experts and eco-friendly suppliers. This allowed us to curate a unique product selection for all plant lovers.",
    subtitle_2:
      "Explore our growing collection of solutions and expertise!",
    img: "/assets/images/banner/b7.jpg",
    thumb_text: "Leafyze <br> Growth",
    year: 2021,
  },
  {
    title: "Advancing Plant Health",
    subtitle_1:
      "2022 marked a year of innovation at Leafyze. We introduced advanced plant diagnostics and treatment tools, making plant care even more accessible and effective for everyone.",
    subtitle_2:
      "Experience the next level of plant health with Leafyze!",
    img: "/assets/images/banner/b5.jpg",
    thumb_text: "Innovation at <br> Leafyze",
    year: 2022,
  },
  {
    title: "Our Community Commitment",
    subtitle_1:
      "In 2023, Leafyze strengthened its commitment to the plant-loving community, launching new initiatives to promote sustainable practices and education on plant care.",
    subtitle_2:
      "Join us as we grow together, promoting a greener future!",
    img: "/assets/images/banner/b6.jpg",
    thumb_text: "Growing Together <br> with Leafyze",
    year: 2023,
  },
];

// slider nav data
const slider_nav_data = [2020, 2021, 2022, 2023];

export default function AboutHistoryArea() {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);
  return (
    <section
      className="tp-history-area pt-140 pb-140"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      <div className="container">
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
              >
                {slider_data.map((item, i) => (
                  <SwiperSlide
                    key={i}
                    className="tp-thistory-item"
                    style={{ backgroundColor: "#f8f8f8" }}
                  >
                    <div className="row">
                      <div className="col-xl-5 col-lg-6 col-md-6">
                        <div className="tp-history-wrapper pr-45">
                          <div className="tp-history-content mb-40">
                            <h3
                              className="tp-history-title"
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            ></h3>
                            <p>{item.subtitle_1}</p>
                            <p>{item.subtitle_2}</p>
                          </div>
                          <div className="tp-history-year">
                            <p>{item.year}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-7 col-lg-6 col-md-6">
                        <div className="tp-history-thumb-wrapper ml-150 p-relative">
                          <div className="tp-history-thumb-text">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item.thumb_text,
                              }}
                            ></p>
                          </div>
                          <div className="tp-history-thumb m-img">
                            <Image
                              src={item.img}
                              alt="thumb_img"
                              width={588}
                              height={380}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="tp-history-nav">
          <div className="row">
            <div className="col-xl-12">
              <Swiper
                className="tp-history-nav-active swiper-container"
                onSwiper={setThumbsSwiper}
                spaceBetween={220}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
              >
                {slider_nav_data.map((num, i) => (
                  <SwiperSlide
                    key={i}
                    className="tp-history-nav-year text-center"
                  >
                    <p>{num}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
