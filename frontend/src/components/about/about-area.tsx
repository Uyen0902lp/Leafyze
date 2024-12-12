import React from "react";
import Image from "next/image";
import about_img from "@/assets/images/about/about-big-1.jpg";
import img from "@/assets/images/banner/b3.jpg";


export default function AboutArea() {
  return (
    <section className="tp-about-area pb-80 pt-95 animation-u">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-10">
            <div className="tp-about-banner-wrapper">
              <h3 className="tp-about-banner-title">
                Driven by Passion, United for Plant Wellness
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-about-banner-thumb w-img">
              <Image src={img} alt="about-img" style={{height:"auto"}} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-about-banner-content">
              <p>
                At Leafyze, we’re excited to bring you a unique selection of plant 
                care solutions. From diagnostic tools to remedies, we’ve curated 
                everything you need to nurture your garden.
              </p>

              <p>
                We prioritize quality in every product, partnering with trusted suppliers 
                to ensure reliability and effectiveness. Our intuitive site design makes 
                finding the right solution easy, and your security is always our top priority. 
                With quick shipping and dedicated support, Leafyze is here to make plant care 
                simple, safe, and satisfying.
              </p>

              <p>
                Our team of plant enthusiasts and experts is dedicated to helping you grow a 
                healthier, more vibrant garden. We understand the challenges of plant care, 
                and we’re committed to providing tools and resources to empower your green journey. 
                Leafyze is more than a store – it’s a community built for plant lovers, by plant lovers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
