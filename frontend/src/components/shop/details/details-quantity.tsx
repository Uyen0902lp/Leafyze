import React from "react";
import { add_cart_product, decrement, increment } from "@/redux/feature/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Minus, Plus } from "../../svg";
import { IProduct } from "@/types/product-d-t";

// prop type 
type IProps = {
    product:IProduct
}

export default function DetailsQuantity({product}:IProps) {
  const { orderQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  // handleIncrease
  const handleIncrease = () => {
    dispatch(increment());
  };
  // handleDecrease
  const handleDecrease = () => {
    dispatch(decrement());
  };

  const handleAddCart = () => {
      dispatch(add_cart_product({
        id: product.id,
        img: product.image as string,
        price: Number(product.final_price),
        quantityAvailable: product.stock,
        title: product.title,
      }))
  }
  return (
    <div className="tp-product-details-action-item-wrapper d-flex align-items-center">
      <div className="tp-product-details-quantity">
        <div className="tp-product-quantity mb-15 mr-15">
          <span className="tp-cart-minus" onClick={handleDecrease}>
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" readOnly value={orderQuantity} />
          <span className="tp-cart-plus" onClick={handleIncrease}>
          <Plus />
          </span>
        </div>
      </div>
      <div className="tp-product-details-add-to-cart mb-15 w-100">
        <button onClick={handleAddCart} className="tp-product-details-add-to-cart-btn w-100">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
