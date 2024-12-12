'use client';
import React from 'react';
import ShopReviewForm from '@/components/form/shop-review-form';
import ShopRating from '../shop-ratings';
import { useGetReviewByProductIdQuery } from '@/redux/api/reviewApiSlice';
import { formatDate } from '@/utils/utils';
import { IDBResponseDT } from '@/types/db-response-dt';
import { IReview } from '@/types/review-d-t';

// prop type 
type IProps = {
    reviews: IDBResponseDT<IReview[]> | undefined;
    id: number;
    average_rating: string | undefined;
    total_ratings:number | undefined;
}

export default function DetailsReviewArea({reviews,average_rating,total_ratings,id}:IProps) {
  return (
    <div className="tp-product-details-review-wrapper pt-60"> 
        <div className="row">
            <div className="col-lg-6">
                <div className="tp-product-details-review-statics">
                    <div className="tp-product-details-review-number d-inline-block mb-50">
                    <h3 className="tp-product-details-review-number-title">Customer reviews</h3>
                    <div className="tp-product-details-review-summery d-flex align-items-center">
                        <div className="tp-product-details-review-summery-value">
                            <span>{average_rating}</span>
                        </div>
                        <div className="tp-product-details-review-summery-rating d-flex align-items-center">
                            <ShopRating averageRating={Number(average_rating)} />
                            <p>({total_ratings} Reviews)</p>
                        </div>
                    </div>
                    </div>

                    <div className="tp-product-details-review-list pr-110">
                    <h3 className="tp-product-details-review-title">Rating & Review</h3>
                    {reviews && reviews.data.map((item) => (
                    <div key={item.id} className="tp-product-details-review-avater d-flex align-items-start">
                        <div className="tp-product-details-review-avater-content">
                            <div className="tp-product-details-review-avater-rating d-flex align-items-center">
                                <ShopRating averageRating={Number(item.rating)} />
                            </div>
                            <h3 className="tp-product-details-review-avater-title">{item.user_name}</h3>
                            <span className="tp-product-details-review-avater-meta">{formatDate(item.rating_date)} </span>

                            <div className="tp-product-details-review-avater-comment">
                                <p>{item.review}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                  </div>
                </div>
            </div> 
            <div className="col-lg-6">
                <div className="tp-product-details-review-form">
                    <h3 className="tp-product-details-review-form-title">Review this product</h3>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    <ShopReviewForm productId={id}/>
                </div>
            </div>
        </div>
    </div>
  )
}
