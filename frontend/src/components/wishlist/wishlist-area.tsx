'use client';
import React from "react";
import { useAppSelector } from "@/redux/hook";
import Link from "next/link";
import WishlistItem from "./wishlist-item";

export default function WishlistArea() {
  const { wishlists } = useAppSelector((state) => state.wishlist);
  return (
    <section className="tp-cart-area pb-120">
      <div className="container">
        {wishlists.length === 0 && (
          <div className="text-center pt-50">
            <h3>No Wishlist Items Found</h3>
            <Link href="/shop" className="tp-cart-checkout-btn mt-20">
              Continue Shopping
            </Link>
          </div>
        )}
        {wishlists.length > 0 && (
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-cart-list mb-45 mr-30">
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan={2} className="tp-cart-header-product">
                        Product
                      </th>
                      <th className="tp-cart-header-price">Price</th>
                      <th>Action</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlists.map((item, i) => (
                      <WishlistItem key={i} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="tp-cart-bottom">
                <div className="row align-items-end">
                  <div className="col-xl-6 col-md-4">
                    <div className="tp-cart-update">
                      <Link href="/cart" className="tp-cart-update-btn">
                        Go To Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
