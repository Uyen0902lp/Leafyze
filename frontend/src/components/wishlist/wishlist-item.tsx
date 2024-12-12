import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ICartType } from "@/types/cart-type";
import { Remove } from "../svg";
import { useAppDispatch } from "@/redux/hook";
import { add_cart_product } from "@/redux/feature/cartSlice";
import { remove_wishlist_product } from "@/redux/feature/wishlistSlice";

// prop type
type IProps = {
  item: ICartType;
};

export default function WishlistItem({ item }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/shop-details/${item.id}`}>
          <Image
            src={`${item?.img}`}
            alt="cart-img"
            width={78}
            height={100}
          />
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link href={`/shop-details/${item.id}`}>{item.title}</Link>
      </td>
      <td className="tp-cart-price">
        <span>${item.price.toFixed(2)}</span>
      </td>

      <td className="tp-cart-add-to-cart">
        <button onClick={() => dispatch(add_cart_product(item))} type="button" className="tp-btn tp-btn-2 tp-btn-blue">
          Add To Cart
        </button>
      </td>

      <td className="tp-cart-action">
        <button onClick={() => dispatch(remove_wishlist_product(item))} className="tp-cart-action-btn">
          <Remove />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
}
