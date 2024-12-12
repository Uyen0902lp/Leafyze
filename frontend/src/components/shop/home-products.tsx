"use client";
import { useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductItem from "./product-item";
import { ShapeLine } from "../svg";
import ErrMsg from "../err-msg";
import HomeProductsNav from "./home-products-nav";
import { useGetAllProductsQuery } from "@/redux/api/productApiSlice";
import { ICategory } from "@/types/category-d-t";

// type
type IProps = {
  categories: ICategory[];
};
export default function HomeProducts({ categories }: IProps) {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { isError, isLoading, data: products } = useGetAllProductsQuery({categoryId,limit:8});
  let content = null;
  if (isLoading) {
    content = (
      Array(8).fill(0).map((_, index) => (
        <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
          <Skeleton height={400} />
        </div>
      ))
    );
  } else if (isError) {
    content = <ErrMsg msg="Something went wrong!" />;
  } else if (products && products?.data?.products) {
    content = products.data.products.map((item) => (
      <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
        <ProductItem product={item} />
      </div>
    ));
  }
  return (
    <section className="tp-product-area pb-70">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6 col-lg-5">
            <div className="tp-section-title-wrapper-5 mb-45 text-center text-lg-start">
              <span className="tp-section-title-pre-5">
                All Product Shop
                <ShapeLine />
              </span>
              <h3 className="tp-section-title-5">Featured Products</h3>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="tp-product-tab-2 tp-product-tab-5 tp-tab mb-55">
              <div className="tp-product-tab-inner-3 d-flex align-items-center justify-content-center justify-content-lg-end">
                {/* tab nav */}
                <HomeProductsNav categories={categories} setCategoryId={setCategoryId} productsCount={products?.data?.products.length  as number} />
                {/* tab nav */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="tab-content" id="nav-tabContent">
              <div className="row">
                {content}
              </div>
            </div>
            <div className="tp-slider-btn-5 text-center">
              <Link href="/shop" className="tp-btn-green">Shop Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
