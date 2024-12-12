import React from "react";
import Image from "next/image";
import shape_1 from "@/assets/images/cta/shape/cta-shape-1.png";
import shape_2 from "@/assets/images/cta/shape/cta-shape-2.png";
import thumb from "@/assets/images/cta/cta-thumb-1.jpg";
import image from "@/assets/images/cta/Image.png"
import { AppStore, GooglePlay } from "../svg";

export default function CtaArea() {
  return (
    <section className="tp-cta-area fix pt-50 p-relative z-index-1">
      <div
        className="tp-cta-inner p-relative pt-80 pb-55"
        data-bg-color="#678E61"
        style={{ backgroundColor: "#678E61" }}
      >
        <div className="tp-cta-shape">
          <Image className="tp-cta-shape-1" src={shape_1} alt="shape" />
          <Image className="tp-cta-shape-2" src={shape_2} alt="shape" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-7">
              <div className="tp-cta-wrapper p-relative z-index-1">
                <h3 className="tp-cta-title">
                  Get the app & get Your Groceries from home
                </h3>
                <div className="tp-cta-btn-wrapper d-flex flex-wrap">
                  <div className="tp-app-btn mb-30">
                    <a
                      href="#"
                      className="d-flex align-items-center google-btn"
                    >
                      <div className="app-icon mr-10">
                        <span>
                          <GooglePlay />
                        </span>
                      </div>
                      <div className="app-content">
                        <span>Get it on</span>
                        <p>Google Play</p>
                      </div>
                    </a>
                  </div>
                  <div className="tp-app-btn mb-30">
                    <a href="#" className="d-flex align-items-center apple-btn">
                      <div className="app-icon mr-10">
                        <span>
                          <AppStore />
                        </span>
                      </div>
                      <div className="app-content">
                        <span>Download on the</span>
                        <p>App Store</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="tp-cta-thumb">
                <span className="tp-cta-thumb-mobile"></span>
                <Image src={thumb} alt="thumb" style={{ height: "auto" }} />
              </div>
              <span className="tp-cta-thumb-gradient"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
