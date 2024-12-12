"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "@/redux/hook";
import Link from "next/link";

// stripePromise
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STORE_URL as string);

export default function StripeProvider({children}:{children: React.ReactNode}) {
  const { cart_products } = useAppSelector((state) => state.cart);

  return (
    <>
      {cart_products.length === 0 ? (
        <div className="text-center pt-50 pb-50">
          <h3 className="py-2">No items found in cart to checkout</h3>
          <Link href="/shop" className="tp-checkout-btn">
            Return to shop
          </Link>
        </div>
      ) : (
        <Elements stripe={stripePromise}>{children}</Elements>
      )}
    </>
  );
}
