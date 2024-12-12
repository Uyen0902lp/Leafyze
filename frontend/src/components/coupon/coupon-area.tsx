"use client";
import React, { useState } from "react";
import CouponItem from "./coupon-item";
import { ICoupon } from "@/types/coupon-type";

// prop type 
type IProps = {
  coupons: ICoupon[];
}
export default function CouponArea({ coupons }: IProps) {
  const [copiedCode, setCopiedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopied = (code: string) => {
    setCopiedCode(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div className="tp-coupon-area pb-120">
      <div className="container">
        <div className="row">
          {coupons.map((item) => (
            <div key={item.id} className="col-xl-6">
              <CouponItem
                coupon={item}
                copied={copied}
                copiedCode={copiedCode}
                handleCopied={handleCopied}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
