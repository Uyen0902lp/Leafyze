import express from 'express';
import { CouponController } from './coupon.controller';

const router = express.Router()

router.get('/show-all', CouponController.getALlCoupons)

export const CouponRoutes = router
