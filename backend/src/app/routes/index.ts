import express from 'express';
import { CategoryRoutes } from '../modules/category/category.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { ProductRoutes } from '../modules/product/product.route';
import { UserRoutes } from '../modules/user/user.route';
import { CouponRoutes } from '../modules/coupon/coupon.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { DetectRoutes } from '../modules/detect/detect.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/brand',
    route: BrandRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/coupon',
    route: CouponRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/detect',
    route: DetectRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;