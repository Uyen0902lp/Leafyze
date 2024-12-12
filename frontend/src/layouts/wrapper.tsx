"use client";
import React, { useEffect, useRef } from "react";
import useAuthCheck from "@/hooks/use-auth-check";
import { getCartProducts } from "@/redux/feature/cartSlice";
import { getWishlistProducts } from "@/redux/feature/wishlistSlice";
import { useAppDispatch } from "@/redux/hook";
import { createPortal } from "react-dom";
import ProductModal from "@/components/common/product-modal";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const authChecked = useAuthCheck();
  const modalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    dispatch(getCartProducts());
    dispatch(getWishlistProducts());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      modalRef.current = document.body;
    }
  }, []);

  return (
    <>
      {children}
      {modalRef.current &&
        createPortal(
          <ProductModal />,
          modalRef.current
        )}
    </>
  );
}
