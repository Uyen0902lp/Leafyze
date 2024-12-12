'use client';
import React from 'react';
import { Rating } from 'react-simple-star-rating'

// type props 
type IProps = {
    averageRating: number;
}

const ShopRating = ({ averageRating }:IProps) => {
  return (
    <Rating initialValue={averageRating} readonly={true} size={16} />
  );
};

export default ShopRating;


