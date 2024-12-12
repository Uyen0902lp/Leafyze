import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import BreadcrumbArea from "@/components/breadcrumb/breadcrumb-area";
import WishlistArea from "@/components/wishlist/wishlist-area";
import Footer from "@/layouts/footer/footer";

export const metadata: Metadata = {
  title: "Wishlist page - Leafyze",
};

export default function WishlistPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* breadcrumb area */}
        <BreadcrumbArea
          top_cls="pt-95 pb-50"
          title="Wishlist"
          subtitle="Shop"
        />
        {/* breadcrumb area */}

        {/* cart area */}
        <WishlistArea />
        {/* cart area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
