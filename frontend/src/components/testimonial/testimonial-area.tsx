"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { NextArrow, PrevArrow, ShapeLine } from "../svg";

const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: {
    el: ".tp-testimonial-slider-dot-5",
    clickable: true,
  },
  navigation: {
    nextEl: ".tp-testimonial-slider-5-button-next",
    prevEl: ".tp-testimonial-slider-5-button-prev",
  },
};

const testimonial_data = [
  {
    id: 1,
    rating: 5,
    user: "/assets/images/users/user-6.png",
    name: "Le Nhat Minh",
    designation: "Plant Health Consultant",
    desc: "I have been shopping from Leafyze for the past few months and absolutely love the experience. I've even recommended it to my friends and family. The quality of their products and customer service is top-notch!",
  },
  {
    id: 2,
    rating: 4,
    user: "/assets/images/users/user-5.png",
    name: "Duong Vu Thu Phuong",
    designation: "Customer Experience Specialist",
    desc: "I've had a great experience with Leafyze, from their product selection to their customer service. Whether it's been a purchase or just getting advice, their team has been incredibly helpful.",
  },
  {
    id: 3,
    rating: 4.5,
    user: "/assets/images/users/user-7.png",
    name: "Nguyen Duy Bach",
    designation: "Garden Solutions Expert",
    desc: "Leafyze's diagnostic tool has really streamlined my gardening routine. I now spend less time guessing plant issues and more time nurturing a healthy garden. It makes identifying and solving plant problems so much easier!",
  },
];

export default function TestimonialArea() {
  return (
    <section className="tp-testimonial-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="tp-testimonial-slider-wrapper-5">
              <div className="row">
                <div className="col-xl-7 offset-xl-3">
                  <div className="tp-section-title-wrapper-5 mb-45">
                    <span className="tp-section-title-pre-5">
                      Customer Reviews
                      <ShapeLine />
                    </span>
                    <h3 className="tp-section-title-5">Our Happy Customers</h3>
                  </div>
                </div>
              </div>
              <div className="tp-testimonial-slider-5 p-relative">
                <Swiper
                  {...slider_setting}
                  modules={[Pagination, Navigation]}
                  className="tp-testimonial-slider-active-5 swiper-container pb-15"
                >
                  {testimonial_data.map((item) => (
                    <SwiperSlide
                      key={item.id}
                      className="tp-testimonial-item-5 d-md-flex white-bg"
                    >
                      <div className="tp-testimonial-avater-wrapper-5 p-relative">
                        <div className="tp-avater-rounded mr-60">
                          <div className="tp-testimonial-avater-5 ">
                            <Image src={item.user} alt="user" width={240} height={267} />
                          </div>
                        </div>
                        <span className="quote-icon">
                          <Image
                            src="/assets/images/testimonial/testimonial-quote-2.png"
                            alt="quote"
                            width={25}
                            height={18}
                          />
                        </span>
                      </div>

                      <div className="tp-testimonial-content-5">
                        <div className="tp-testimonial-rating tp-testimonial-rating-5">
                          <span><i className="fa-solid fa-star"></i></span>
                          <span><i className="fa-solid fa-star"></i></span>
                          <span><i className="fa-solid fa-star"></i></span>
                          <span><i className="fa-solid fa-star"></i></span>
                          <span><i className="fa-solid fa-star"></i></span>
                        </div>

                        <p>{item.desc}</p>

                        <div className="tp-testimonial-user-5-info">
                          <h3 className="tp-testimonial-user-5-title">
                            {item.name}
                          </h3>
                          <span className="tp-testimonial-user-5-designation">
                            {item.designation}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="tp-testimonial-arrow-5">
                  <button
                    type="button"
                    className="tp-testimonial-slider-5-button-prev"
                  >
                    <PrevArrow />
                  </button>
                  <button
                    type="button"
                    className="tp-testimonial-slider-5-button-next"
                  >
                    <NextArrow />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
