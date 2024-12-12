"use client";
import React, { useState } from "react";
import ErrMsg from "../err-msg";
import { useSearchParams } from "next/navigation";
import { useGetSearchProductsQuery } from "@/redux/api/productApiSlice";
import ProductLoader from "../loader/product-loader";
import ProductItem from "../shop/product-item";

export default function SearchArea() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText");
  const [next, setNext] = useState(8);
  const {data: products,isLoading,error} = useGetSearchProductsQuery(searchText, {
    skip: !searchText,
    refetchOnMountOrArgChange: true,
  });

  //   handleLoadMore
  const handleLoadMore = () => {
    setNext((value) => value + 4);
  };
  return (
    <section className="tp-shop-area pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="tp-shop-main-wrapper">
              <div className="tp-shop-top mb-45">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="tp-shop-top-left d-flex align-items-center ">
                      <div className="tp-shop-top-result">
                        <p>Showing 1– of {products?.data.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
                      <div className="tp-shop-top-select">
                        <h3>Search Text : {`"${searchText}"`}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tp-shop-items-wrapper tp-shop-item-primary">
                <div className="tab-content" id="productTabContent">
                  <div className="row infinite-container">
                    {isLoading ? (
                      <ProductLoader loading={isLoading} />
                    ) : products ? (
                      products?.data?.slice(0, next).map((item) => (
                        <div key={item.id} className="col-lg-3 col-sm-6">
                          <ProductItem product={item} />
                        </div>
                      ))
                    ) : (
                      <ErrMsg msg="No product found!" />
                    )}
                  </div>
                </div>

                {/* load more btn start */}
                {products?.data?.length && next < products?.data?.length && (
                  <div className="load-more-btn text-center pt-50">
                     <button onClick={handleLoadMore} className="tp-btn tp-btn-2 tp-btn-blue">
                        Load More
                     </button>
                 </div>
                )}
                {/* load more btn end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
