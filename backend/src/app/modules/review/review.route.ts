import express from 'express';
import { ReviewController } from './review.controller';
const router = express.Router();

// get product
router.get('/product-review/:id',
  ReviewController.getProductReviews
);
// save review
router.post('/save-review',
  ReviewController.saveReviewController
);

export const ReviewRoutes = router;