import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProductSmItem from "./product-sm-item";
import { RightArrow, ShapeLine } from "../svg";
import { getBestSellingProducts, getTopRatedProducts } from "@/api/getProducts";
import { IProduct } from "@/types/product-d-t";

export default async function HomeSmProducts() {
  const bestSellPrdData = getBestSellingProducts(3);
  const topRatedPrdData = getTopRatedProducts(3);
  const [bestSellingProducts, topRatedProducts] = await Promise.all([
    bestSellPrdData,
    topRatedPrdData,
  ]);
  return (
    <section className="tp-product-sm-area pt-120 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div
              className="tp-product-side-banner text-center mb-60"
              style={{ backgroundColor: "#EEEBE4" }}
            >
              <div className="tp-product-side-banner-content">
                <div className="tp-product-side-banner-subtitle">
                  <Image
                    src="/assets/images/product/side/pre-title.png"
                    alt="title"
                    width={146}
                    height={22}
                  />
                </div>
                <h3 className="tp-product-side-banner-title">
                  Get Up to 26% Off Crop Care Solutions
                </h3>

                <div className="tp-product-side-banner-btn">
                  <Link href="/shop" className="tp-btn-green tp-btn-green-sm">
                    Shop Now
                    <RightArrow />
                  </Link>
                </div>
                <div className="tp-product-side-banner-thumb">
                  <Image
                    src="/assets/images/product/side/side-2.png"
                    alt="side"
                    width={250}
                    height={291}
                    style={{ height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="tp-product-sm-wrapper-5 mb-60">
              <h3 className="tp-product-sm-section-title">
                Top Selling Products
                <ShapeLine />
              </h3>

              <div className="tp-product-sm-item-wrapper-5 is-translate-24">
                {bestSellingProducts?.data &&
                  bestSellingProducts.data.map((item: IProduct) => (
                    <ProductSmItem key={item.id} product={item} />
                  ))}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="tp-product-sm-wrapper-5 mb-60">
              <h3 className="tp-product-sm-section-title">
                Top Rated Products
                <ShapeLine />
              </h3>

              <div className="tp-product-sm-item-wrapper-5">
                {topRatedProducts?.data &&
                  topRatedProducts.data.map((item: IProduct) => (
                    <ProductSmItem key={item.id} product={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
