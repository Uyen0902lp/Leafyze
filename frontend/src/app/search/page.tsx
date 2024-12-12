import { Metadata } from "next";
import React, { Suspense } from "react";
import Wrapper from "@/layouts/wrapper";
import Footer from "@/layouts/footer/footer";
import HeaderArea from "@/layouts/header/header-area";
import SearchArea from "@/components/search/search-area";
import BreadcrumbArea from "@/components/breadcrumb/breadcrumb-area";

export const metadata: Metadata = {
  title: "Search page - Leafyze",
};

export default function SearchPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* breadcrumb area */}
        <BreadcrumbArea top_cls="pt-100 pb-50" title="Shop" subtitle="Shop" />
        {/* breadcrumb area */}

        {/* search area */}
        <Suspense fallback={<h3>Loading...</h3>}>
          <SearchArea />
        </Suspense>
        {/* search area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
