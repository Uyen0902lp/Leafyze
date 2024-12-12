import React, { useState } from "react";
import Link from "next/link";
import PriceFilter from "./price-filter";
import { ICategory } from "@/types/category-d-t";
import { IProduct } from "@/types/product-d-t";
import Image from "next/image";
import ShopRating from "../shop-ratings";
import { IBrand } from "@/types/brand-type";
import { useRouter, useSearchParams } from "next/navigation";

// prop type
type IProps = {
  maxPrice: number;
  categories: ICategory[];
  topRatedProducts: IProduct[];
  brands: IBrand[];
  handleReset(): void;
  priceValue: number[];
  setPriceValue: React.Dispatch<React.SetStateAction<number[]>>
};

export default function ShopSidebarArea({
  maxPrice,
  categories,
  topRatedProducts,
  brands,
  handleReset,
  priceValue,
  setPriceValue,
}: IProps) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const parentCategory = searchParams.get("parentCategory");

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandSelection = (brandSlug: string) => {
    setSelectedBrand(brandSlug);
    router.push(`?brand=${brandSlug}`);
  };

  return (
    <div className="tp-shop-sidebar mr-10">
      {/* filter */}
      <div className="tp-shop-widget mb-35">
        <h3 className="tp-shop-widget-title no-border">Price Filter</h3>
        <PriceFilter maxPrice={maxPrice} priceValue={priceValue} setPriceValue={setPriceValue} />
      </div>

      {/* categories */}
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>
              {categories.map((item) => (
                <li key={item.id}>
                  <a className={`pointer ${parentCategory === item.slug ? "active" : ""}`} onClick={() => router.push(`?parentCategory=${item.slug}`)}>
                    {item.title} <span>{item.productCount}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* product rating */}
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Top Rated Products</h3>

        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-product">
            {topRatedProducts.map((item) => (
              <div
                key={item.id}
                className="tp-shop-widget-product-item d-flex align-items-center"
              >
                <div className="tp-shop-widget-product-thumb">
                  <Link href={`/shop-details/${item?.slug}`}>
                    <Image
                      src={`${item?.image}`}
                      alt="product-img"
                      width={70}
                      height={70}
                    />
                  </Link>
                </div>
                <div className="tp-shop-widget-product-content">
                  <div className="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
                    <div className="tp-shop-widget-product-rating">
                      <ShopRating
                        averageRating={Number(item?.average_rating)}
                      />
                    </div>
                    <div className="tp-shop-widget-product-rating-number">
                      <span>({item?.average_rating})</span>
                    </div>
                  </div>
                  <h4 className="tp-shop-widget-product-title">
                    <Link href={`/shop-details/${item?.slug}`}>{item?.title}</Link>
                  </h4>
                  <div className="tp-shop-widget-product-price-wrapper">
                    <span className="tp-shop-widget-product-price">
                      ${item?.final_price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* brand */}
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Popular Brands</h3>
        <div className="tp-shop-widget-content">
          <div className="row gx-2 tp-shop-widget-brand-list">
            {brands.map((item) => (
              <div key={item.id} className="col-md-6">
                <button
                  onClick={() => handleBrandSelection(item.slug)}
                  className="tp-shop-widget-brand-item w-100"
                  style={{
                    color: selectedBrand === item.slug ? "#678E61" : "initial",
                    border: selectedBrand === item.slug ? "1px solid #678E61" : "1px solid #000000",
                  }}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* reset */}
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Reset Filter</h3>
        <button
          onClick={handleReset}
          className="tp-btn"
        >
          Reset Filter
        </button>
      </div>

    </div>
  );
}
