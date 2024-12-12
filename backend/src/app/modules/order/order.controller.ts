import { Request, Response } from 'express';
import { OrderService } from './order.service';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

// create payment intent controller
async function createPaymentIntent(req: Request, res: Response) {
  const { amount } = req.body;
  const result = await OrderService.createPaymentIntentService(parseInt(amount));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent generated successfully!',
    data: result,
  })
}

// save order controller
async function saveOrder(req: Request, res: Response) {
  try {
    const { amount, paymentIntentId, products, shipCost, status, userInfo } = req.body;

    const { id, orderID, products: updatedProducts } = await OrderService.saveOrderService(
      amount,
      paymentIntentId || "COD",
      products,
      shipCost,
      status,
      userInfo
    );

    // Gửi phản hồi thành công
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order saved successfully!",
      data: {
        id,
        orderID,
        products: updatedProducts.map(product => ({
          id: product.id,
          title: product.title,
          orderQuantity: product.orderQuantity,
          quantityAvailable: product.quantityAvailable,
        })),
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      sendResponse(res, {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
      });
    } else if (error instanceof Error) {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message || "An unknown error occurred.",
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An unknown error occurred.",
      });
    }
  }
}

// get order by id controller
async function getOrderById(req: Request, res: Response) {
  const orderId = req.params.id;
  const result = await OrderService.getOrderByIdService(orderId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order get successfully!',
    data: result,
  })
}

// get user orders 
async function getOrderByUser(req: Request, res: Response) {
  const userId = req?.user?.id;
  const result = await OrderService.getOrderByUserService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders get successfully!',
    data: result,
  })
}

// Get all orders
async function getAllOrders(req: Request, res: Response) {
  const result = await OrderService.getAllOrdersService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders fetched successfully!",
    data: {
      orders: result.orders,
      countAll: result.countAll,
    },
  });
}

// Update order
async function updateOrder(req: Request, res: Response) {
  const id = req.params.id;
  const updatedData = req.body;

  if (updatedData.products && typeof updatedData.products !== "string") {
    if (Array.isArray(updatedData.products)) {
      updatedData.products = JSON.stringify(updatedData.products);
    } else {
      throw new ApiError(400, "Invalid products format. Must be an array or JSON string.");
    }
  }

  const result = await OrderService.updateOrderService(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully!",
    data: result,
  });
}

export const OrderController = {
  createPaymentIntent,
  saveOrder,
  getOrderById,
  getOrderByUser,
  getAllOrders,
  updateOrder,
}
