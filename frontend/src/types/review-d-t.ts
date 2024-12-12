export type IReview = {
  id: number;
  product_id: number;
  rating: number;
  review: string;
  user_name: string;
  rating_date: string;
};
export type ISaveReview = {
  productId: number;
  userId: number;
  rating: number;
  review: string;
};
