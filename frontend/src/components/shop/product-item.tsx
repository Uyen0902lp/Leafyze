'use client';
import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CartTwo, QuickView, Wishlist } from "../svg";
import { IProduct } from "@/types/product-d-t";
import { add_cart_product } from "@/redux/feature/cartSlice";
import { add_to_wishlist } from "@/redux/feature/wishlistSlice";
import { setModalProduct } from "@/redux/feature/productSlice";
import Link from "next/link";

type IProps = {
  product: IProduct;
  disableLink?: boolean;
};

export default function ProductItem({ product, disableLink = false }: IProps) {
  const { cart_products } = useAppSelector((state) => state.cart);
  const { wishlists } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const isAlreadyInCart = cart_products.some((item) => item.id === product.id);
  const isAlreadyInWishlist = wishlists.some((item) => item.id === product.id);

  function handleAddToCart(prd: IProduct) {
    if (!isAlreadyInCart) {
      dispatch(add_cart_product({
        id: prd.id,
        img: prd.image as string,
        price: Number(prd.final_price),
        quantityAvailable: prd.stock,
        title: prd.title
      }));
    }
  }

  function handleAddToWishlist(prd: IProduct) {
    if (!isAlreadyInWishlist) {
      dispatch(add_to_wishlist({
        id: prd.id,
        img: prd.image as string,
        price: Number(prd.final_price),
        quantityAvailable: prd.stock,
        title: prd.title
      }));
    }
  }

  const handleQuickView = () => dispatch(setModalProduct(product));

  return (
    <div className="tp-product-item-5 p-relative white-bg mb-40">
      <div className="tp-product-thumb-5 w-img fix mb-15">
        {!disableLink ? (
          <Link href={`/shop-details/${product?.slug}`}>
            <Image src={`${product?.image}`} alt="product-img" width={306} height={353} />
          </Link>
        ) : (
          <Image src={`${product?.image}`} alt="product-img" width={306} height={353} />
        )}

        <div className="tp-product-action-2 tp-product-action-5 tp-product-action-greenStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            <button
              onClick={() => handleAddToCart(product)}
              type="button"
              className={`tp-product-action-btn-2 tp-product-add-cart-btn ${isAlreadyInCart ? 'active' : ''}`}
            >
              <CartTwo />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                {isAlreadyInCart ? 'Already In Cart' : 'Add To Cart'}
              </span>
            </button>
            <button
              type="button"
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
              onClick={handleQuickView}
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Quick View
              </span>
            </button>
            <button
              onClick={() => handleAddToWishlist(product)}
              type="button"
              className={`tp-product-action-btn-2 tp-product-add-to-wishlist-btn ${isAlreadyInWishlist ? 'active' : ''}`}
            >
              <Wishlist />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                {isAlreadyInWishlist ? 'Already In Wishlist' : 'Add To Wishlist'}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-content-5">
        <h3 className="tp-product-title-5">
          {!disableLink ? (
            <Link href={`/shop-details/${product?.slug}`}>{product?.title}</Link>
          ) : (
            <span>{product?.title}</span>
          )}
        </h3>
        <div className="tp-product-price-wrapper-5">
          <span className="tp-product-price-5 new-price">${product?.final_price}</span>
          {Number(product.discount) > 0 && (
            <span className="tp-product-price-5 old-price">${product?.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
