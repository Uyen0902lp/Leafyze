import { Request, Response } from 'express';
import catchAsync from '../../shared/createAsync';
import { CouponService } from './coupon.service';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';

// get all coupons
const getALlCoupons = catchAsync(async (req: Request, res: Response) => {
  const coupons = await CouponService.getAllCouponsService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon fetched successfully!',
    data: coupons,
  })
})

export const CouponController = {
  getALlCoupons,
}
