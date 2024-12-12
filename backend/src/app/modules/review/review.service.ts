import { ResultSetHeader } from 'mysql2'
import pool from '../../../db'
import ApiError from '../../../errors/ApiError'
import { CountResult } from './review.interface'

// get reviews
async function getReviewsService(productId: string) {
  try {
    const sql = `
        SELECT 
          r.id,
          r.product_id,
          r.rating,
          r.review,
          u.username AS user_name,
          r.rating_date
        FROM 
          ratings r
        JOIN 
          users u ON r.user_id = u.id
        WHERE 
          r.product_id = ?
      `

    const params: [string] = [productId]
    const [result] = await pool.execute(sql, params)

    return result
  } catch (error) {
    console.log('Error in getReviewsService:', error)
    throw new ApiError(500,'Failed to fetch reviews')
  }
}

// save review
/*
*/

async function saveReviewService(
  productId: string,
  userId: string,
  rating: number,
  review: string
) {
  try {
    const ratingDate = new Date().toISOString().split('T')[0] // Current date in 'YYYY-MM-DD' format

    // Step 1: Check if the user_id exists in the orders table
    const checkPurchaseSql = `
        SELECT COUNT(*) AS count 
        FROM orders 
        WHERE user_id = ? 
            AND JSON_CONTAINS(products, JSON_OBJECT('id', ?), '$')`

    const [checkPurchaseResult] = await pool.execute<CountResult[]>(
      checkPurchaseSql,
      [userId, productId]
    )

    if (checkPurchaseResult[0].count === 0) {
      throw new ApiError(
        400,
        'Please purchase this product first before leaving a review.'
      )
    }

    // Step 2: Insert the review if user_id exists
    const sql = `
        INSERT INTO ratings
          (product_id, user_id, rating, review, rating_date)
        VALUES
          (?, ?, ?, ?, ?)
      `

    const params: [string, string, number, string, string] = [
      productId,
      userId,
      rating,
      review,
      ratingDate,
    ]

    const [result] = await pool.execute<ResultSetHeader>(sql, params)

    return {
      success: true,
      message: 'Review saved successfully',
      reviewId: result.insertId,
    }
  } catch (error) {
    console.error('Error in saveReviewService:', error)
    if (error instanceof ApiError) {
      // Re-throw ApiError to preserve custom message and status
      throw error
    }
    throw new ApiError(500, 'Failed to save review');
  }
}

export const ReviewService = {
  getReviewsService,
  saveReviewService,
}
