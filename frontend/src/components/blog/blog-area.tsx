'use client';
import React from "react";
import usePagination from "@/hooks/use-pagination";
import blogData from "@/data/blog-data";
import BlogSidebar from "./blog-sidebar";
import Pagination from "../ui/pagination";
import BlogItem from "./blog-item";

export default function BlogArea() {
  const { currentItems, handlePageClick, pageCount } = usePagination(
    blogData,
    4
  );
  return (
    <section className="tp-postbox-area pt-120 pb-120 animation-u">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tp-postbox-wrapper pr-50">
              {currentItems &&
                currentItems.map((item) => (
                  <BlogItem key={item.id} item={item} />
                ))}
              <div className="tp-blog-pagination mt-50">
                <div className="tp-pagination">
                  <Pagination
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
