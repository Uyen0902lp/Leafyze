"use client";
import React, { Dispatch, SetStateAction } from "react";
import { ICategory } from "@/types/category-d-t";

// prop type
type IProps = {
  categories: ICategory[];
  setCategoryId: Dispatch<SetStateAction<number | null>>;
  productsCount: number;
};
export default function HomeProductsNav({ categories, setCategoryId,productsCount }: IProps) {
  const [activeTab, setActiveTab] = React.useState("All Products");
  const activeRef = React.useRef<HTMLButtonElement | null>(null);
  const marker = React.useRef<HTMLSpanElement | null>(null);
  // handleActiveTab
  React.useEffect(() => {
    if (activeRef.current && marker.current) {
      marker.current.style.left = activeRef.current.offsetLeft + "px";
      marker.current.style.width = activeRef.current.offsetWidth + "px";
    }
  }, [activeTab]);

  const handleActiveTab = async (id: number | null, tab: string) => {
    setActiveTab(tab);
    setCategoryId(id);
  };

  return (
    <nav>
      <div
        className="nav nav-tabs justify-content-center tp-product-tab tp-tab-menu p-relative"
        id="nav-tab"
        role="tablist"
      >
        <button
          key="all"
          ref={activeTab === "All Products" ? activeRef : null}
          onClick={() => handleActiveTab(null, "All Products")}
          className={`nav-link ${activeTab === "All Products" ? "active" : ""}`}
        >
          All Products
          <span className="tp-product-tab-tooltip">
            {productsCount}
          </span>
        </button>
        {categories.slice(0, 2).map((cate, i) => (
          <button
            key={i}
            ref={activeTab === cate.title ? activeRef : null}
            onClick={() => handleActiveTab(cate.id, cate.title)}
            className={`nav-link ${activeTab === cate.title ? "active" : ""}`}
          >
            {cate.title.split("-").join(" ")}
            <span className="tp-product-tab-tooltip">{productsCount}</span>
          </button>
        ))}

        <span
          ref={marker}
          id="productTabMarker"
          className="tp-tab-line d-none d-sm-inline-block"
        ></span>
      </div>
    </nav>
  );
}
