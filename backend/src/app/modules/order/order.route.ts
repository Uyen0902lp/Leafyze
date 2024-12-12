import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../../middleware/auth';
const router = express.Router();
import { ENUM_USER_ROLE } from '../../../enums/user';

router.post('/create-payment-intent',OrderController.createPaymentIntent);
router.post('/save-order',OrderController.saveOrder);
router.get('/user-orders', auth(),OrderController.getOrderByUser);
router.get('/order-by-id/:id',OrderController.getOrderById);
router.get('/show-all', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);
router.patch('/update-order/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.updateOrder);

export const OrderRoutes = router; 