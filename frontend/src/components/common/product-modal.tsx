"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { closeModal } from "@/redux/feature/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import ShopRating from "../shop/shop-ratings";
import DetailsQuantity from "../shop/details/details-quantity";
import { initialOrderQuantity } from "@/redux/feature/cartSlice";
import { Question, WishlistTwo } from "../svg";
import { add_to_wishlist } from "@/redux/feature/wishlistSlice";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/product-d-t";

export default function ProductModal() {
  const { modalProduct, showModal } = useAppSelector((state) => state.product);
  const {wishlists} = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    image,
    category_name,
    title,
    average_rating,
    total_ratings,
    description,
    final_price,
    stock,
  } = modalProduct || {};

  // is already in wishlist
  const isAlreadyInWishlist = wishlists.some((item) => item.id === modalProduct?.id);

  // handle close modal
  function onHide() {
    dispatch(initialOrderQuantity());
    dispatch(closeModal());
  }

   // handle add to wishlist
   function handleAddToWishlist(prd: IProduct) {
    if(isAlreadyInWishlist){
      router.push('/wishlist');
    } else {
      dispatch(add_to_wishlist({
        id: prd.id,
        img: prd.image as string,
        price: Number(prd.final_price),
        quantityAvailable: prd.stock,
        title: prd.title
      }))
    }
  }
  return (
    <>
      {modalProduct && (
        <Modal
          show={showModal}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="tp-product-modal tp-product-modal-styleGreen"
        >
          <Modal.Body>
            <div className="tp-product-modal-content">
              <button onClick={onHide} type="button" className="tp-product-modal-close-btn">
                <i className="fa-regular fa-xmark"></i>
              </button>
              <div className="row">
                
                <div className="col-lg-5">
                  <div className="tp-product-details-thumb-wrapper tp-tab">
                    <div
                      className="tab-content m-img"
                      id="productDetailsNavContent"
                    >
                      <div className="tp-product-details-nav-main-thumb">
                        <Image
                          src={`${image}`}
                          alt="product-img"
                          width={680}
                          height={670}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="tp-product-details-wrapper">
                    <div className="tp-product-details-category">
                      <span>{category_name}</span>
                    </div>
                    <h3 className="tp-product-details-title">{title}</h3>

                    <div className="tp-product-details-inventory d-flex align-items-center mb-10">
                      <div className="tp-product-details-stock mb-10">
                        <span style={{ color: modalProduct.stock > 0 ? "" : "#FF4B4B" }}>
                          {modalProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
                        <div className="tp-product-details-rating">
                          <ShopRating averageRating={Number(average_rating)} />
                        </div>
                        <div className="tp-product-details-reviews">
                          <span>({total_ratings} Reviews)</span>
                        </div>
                      </div>
                    </div>
                    <p>
                      {description && isExpanded
                        ? description
                        : `${(description ?? "").slice(0, 200)}... `}
                      {(description ?? "").length > 100 && (
                        <span
                          onClick={() => setIsExpanded(!isExpanded)}
                          style={{ cursor: "pointer" }}
                        >
                          {isExpanded ? "See less" : "See more"}
                        </span>
                      )}
                    </p>

                    <div className="tp-product-details-price-wrapper mb-20">
                      <span className="tp-product-details-price new-price">
                        ${final_price}
                      </span>
                    </div>

                    <div className="tp-product-details-action-wrapper">
                      <h3 className="tp-product-details-action-title">
                        Quantity
                      </h3>
                      <DetailsQuantity product={modalProduct} />
                    </div>

                    <div className="tp-product-details-action-sm">
                      <button
                        type="button"
                        className={`tp-product-details-action-sm-btn ${isAlreadyInWishlist ? 'active' : ''}`}
                        onClick={() => handleAddToWishlist(modalProduct)}
                      >
                       <WishlistTwo/>
                        {" "} Add Wishlist
                      </button>
                      <button
                        type="button"
                        className="tp-product-details-action-sm-btn"
                      >
                        <Question/>
                        {" "} Ask a question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
