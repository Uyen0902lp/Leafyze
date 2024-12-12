import { Request, Response } from 'express'
import catchAsync from '../../shared/createAsync'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status'
import { ReviewService } from './review.service'
import ApiError from '../../../errors/ApiError'

// get all reviews
const getProductReviews = catchAsync(async (req: Request, res: Response) => {
  const reviews = await ReviewService.getReviewsService(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully!',
    data: reviews,
  })
})

const saveReviewController = catchAsync(async (req: Request, res: Response) => {
  const { productId, userId, rating, review } = req.body;

  // Validate input data
  if (!productId || !userId || rating === undefined || !review) {
     throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
  }

  // Call the service to save the review
  const result = await ReviewService.saveReviewService(
    productId,
    userId,
    rating,
    review
  )

  // Send the response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review saved successfully!',
    data: {
        reviewId:result.reviewId
    },
  })
})

export const ReviewController = {
  getProductReviews,
  saveReviewController,
}
