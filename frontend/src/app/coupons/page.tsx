import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import Footer from "@/layouts/footer/footer";
import BreadcrumbArea from "@/components/breadcrumb/breadcrumb-area";
import CouponArea from "@/components/coupon/coupon-area";
import { getCoupons } from "@/api/get-coupons";
import { IDBResponseDT } from "@/types/db-response-dt";
import { ICoupon } from "@/types/coupon-type";

export const metadata: Metadata = {
  title: "Coupon page - Leafyze",
};

export default async function CouponPage() {
  const coupons:IDBResponseDT<ICoupon[]> = await getCoupons();
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>

        {/* breadcrumb area */}
        <BreadcrumbArea title="Grab Best Offer" subtitle="Coupon" />
        {/* breadcrumb area */}

        {/* coupon area */}
        <CouponArea coupons={coupons.data} />
        {/* coupon area */}
      </main>

      {/* footer area */}
      <Footer/>
      {/* footer area */}
    </Wrapper>
  )
}
