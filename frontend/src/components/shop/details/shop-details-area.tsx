'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types/product-d-t';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import ShopRating from '../shop-ratings';
import DetailsQuantity from './details-quantity';
import DetailsReviewArea from './details-review-area';
import { useGetReviewByProductIdQuery } from '@/redux/api/reviewApiSlice';
import { Question, WishlistTwo } from '@/components/svg';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { add_to_wishlist } from '@/redux/feature/wishlistSlice';

// prop type 
type IProps = {
  product: IProduct
}

export default function ShopDetailsArea({ product }: IProps) {
  const { id, category_name, title, image, final_price, sku, slug, description, average_rating, total_ratings } = product || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: reviews, error, isLoading } = useGetReviewByProductIdQuery(id, { skip: !id });
  const { wishlists } = useAppSelector((state) => state.wishlist);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // is already in wishlist
  const isAlreadyInWishlist = wishlists.some((item) => item.id === product?.id);

  function handleAddToWishlist(prd: IProduct) {
    if (isAlreadyInWishlist) {
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
    <section className="tp-product-details-area animation-u">
      <div className="tp-product-details-top pb-115">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
                <div className="tab-content m-img" id="productDetailsNavContent">
                  <div className="tp-product-details-nav-main-thumb">
                    <Image
                      src={`${image}`}
                      alt="product-img"
                      width={680}
                      height={670}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="tp-product-details-wrapper">
                <div className="tp-product-details-category">
                  <span>{category_name}</span>
                </div>
                <h3 className="tp-product-details-title">{title}</h3>

                <div className="tp-product-details-inventory d-flex align-items-center mb-10">
                  <div className="tp-product-details-stock mb-10">
                    <div className="tp-product-details-stock mb-10">
                      <span style={{ color: product?.stock > 0 ? "" : "#FF4B4B" }}>
                        {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
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
                  <span className="tp-product-details-price new-price">${final_price}</span>
                </div>


                <div className="tp-product-details-action-wrapper">
                  <h3 className="tp-product-details-action-title">Quantity</h3>
                  <DetailsQuantity product={product} />
                </div>

                <div className="tp-product-details-action-sm">
                  <button
                    type="button"
                    className={`tp-product-details-action-sm-btn ${isAlreadyInWishlist ? 'active' : ''}`}
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <WishlistTwo />
                    {" "} Add Wishlist
                  </button>
                  <button
                    type="button"
                    className="tp-product-details-action-sm-btn"
                  >
                    <Question />
                    {" "} Ask a question
                  </button>
                </div>

                <div className="tp-product-details-query">
                  <div className="tp-product-details-query-item d-flex align-items-center">
                    <span>SKU:  </span>
                    <p>{sku}</p>
                  </div>
                  <div className="tp-product-details-query-item d-flex align-items-center">
                    <span>Category:  </span>
                    <p>{category_name}</p>
                  </div>
                </div>
                <div className="tp-product-details-social">
                  <span>Share: </span>
                  <FacebookShareButton url={`${process.env.NEXT_PUBLIC_STORE_URL}/shop-details/${slug}`}>
                    <FacebookIcon size={34} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={`${process.env.NEXT_PUBLIC_STORE_URL}/shop-details/${slug}`}>
                    <TwitterIcon size={34} round={true} />
                  </TwitterShareButton>
                  <LinkedinShareButton url={`${process.env.NEXT_PUBLIC_STORE_URL}/shop-details/${slug}`}>
                    <LinkedinIcon size={34} round={true} />
                  </LinkedinShareButton>
                  <TelegramShareButton url={`${process.env.NEXT_PUBLIC_STORE_URL}/shop-details/${slug}`}>
                    <TelegramIcon size={34} round={true} />
                  </TelegramShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-product-details-bottom pb-140">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-product-details-tab-nav tp-tab">
                <nav>
                  <div className="nav nav-tabs p-relative tp-product-tab" id="navPresentationTab" role="tablist">
                    <button className="nav-link active" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true" tabIndex={-1}>Description</button>

                    <button className="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false" tabIndex={-1}>Reviews ({reviews?.data.length})</button>

                  </div>
                </nav>

                <div className="tab-content" id="navPresentationTabContent">
                  <div className="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" tabIndex={-1}>
                    <div className="tp-product-details-desc-wrapper pt-40">
                      <div className="row">
                        <div className="col-xl-10">
                          <div className="tp-product-details-desc-item pb-105">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="tp-product-details-desc-content pt-25">
                                  <h3 className="tp-product-details-desc-title">
                                    {title}
                                  </h3>
                                  <p>{description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab" tabIndex={-1}>
                    <DetailsReviewArea id={id} average_rating={average_rating} total_ratings={total_ratings} reviews={reviews} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
