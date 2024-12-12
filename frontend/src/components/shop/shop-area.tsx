"use client";
import React from "react";
import ShopSidebarArea from "./sidebar/shop-sidebar-area";
import Pagination from "../ui/pagination";
import { IProduct } from "@/types/product-d-t";
import ProductItem from "./product-item";
import { ICategory } from "@/types/category-d-t";
import NiceSelect from "../ui/nice-select";
import { IBrand } from "@/types/brand-type";
import ProductLoader from "../loader/product-loader";
import ErrMsg from "../err-msg";
import useProductFilter from "@/hooks/use-product-filter";
import Image from "next/image";
import empty_img from '@/assets/images/product/cartmini/empty-cart.png';
import usePagination from "@/hooks/use-pagination";

// type
type IProps = {
  totalProductsCount: number;
  maxPrice: number;
  categories: ICategory[];
  topRatedProducts: IProduct[];
  brands: IBrand[];
};
export default function ShopArea({
  totalProductsCount,
  maxPrice,
  categories,
  topRatedProducts,
  brands,
}: IProps) {


  const {
    products,
    handleSorting,
    isLoading,
    handleReset,
    handlePageClick,
    pageCount,
    isFiltering,
    priceValue,
    setPriceValue,
  } = useProductFilter(totalProductsCount,maxPrice);

  const {currentItems,handlePageClick:handleFilterPageClick,pageCount:filterPageCount} = usePagination(products, 6);

  const renderingProducts = isFiltering ? currentItems : products;

  return (
    <section className="tp-shop-area pb-120 animation-u">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            {/* Sidebar area start */}
            <ShopSidebarArea
              maxPrice={maxPrice}
              categories={categories}
              topRatedProducts={topRatedProducts}
              brands={brands}
              handleReset={handleReset}
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
            {/* Sidebar area end*/}
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="tp-shop-main-wrapper">
              <div className="tp-shop-top mb-45">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="tp-shop-top-left d-flex align-items-center ">
                      <div className="tp-shop-top-result">
                        <p>Showing 1–{products?.length} of {totalProductsCount} results</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
                      <div className="tp-shop-top-select">
                        <NiceSelect
                          options={[
                            { value: "", label: "Default Sorting" },
                            { value: "low", label: "Low to Hight" },
                            { value: "high", label: "High to Low" },
                            { value: "new", label: "New Added" },
                            { value: "sale", label: "On Sale" },
                          ]}
                          defaultCurrent={0}
                          onChange={(item) => handleSorting(item)}
                          name="Sorting"
                        />
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
                      renderingProducts?.map((item) => (
                        <div key={item.id} className="col-lg-4 col-sm-6">
                          <ProductItem product={item} />
                        </div>
                      ))
                    ) :(
                      <ErrMsg msg="No Products Found" />
                    )}

                    {products.length === 0 && (
                      <div className="text-center">
                        <Image src={empty_img} alt="empty-cart-img" />
                         <p className="mt-10">No Products Found</p>
                        <button onClick={handleReset} className="tp-btn">Reset</button>
                     </div>
                     )}
                  </div>
                </div>
              </div>

              <div className="tp-shop-pagination mt-20">
                <div className="tp-pagination">
                  <Pagination
                    handlePageClick={isFiltering ? handleFilterPageClick : handlePageClick}
                    pageCount={isFiltering ? filterPageCount : pageCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
