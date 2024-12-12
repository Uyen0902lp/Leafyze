import pool from '../../../db'

const getAllCouponsService = async () => {
  const sql = `
      SELECT 
        id,
        title,
        logo,
        coupon_code AS couponCode,
        end_time AS endTime,
        discount_percentage AS discountPercentage,
        minimum_amount AS minimumAmount,
        product_type AS productType
      FROM 
        coupons
    `

  const [result] = await pool.execute(sql)
  return result
}

export const CouponService = {
  getAllCouponsService,
}
