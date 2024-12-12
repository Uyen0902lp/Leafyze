import Stripe from 'stripe'
import secret from '../../../config/secret'
import pool from '../../../db'
import { IProductDT } from '../product/product.interface'
import { ResultSetHeader } from 'mysql2'
import { IOrderRes, ISaveOrderUserInfo, IUserOrdersRes } from './order.interface'
import ApiError from '../../../errors/ApiError'
import { RowDataPacket } from "mysql2";
import crypto from "crypto";

const stripe = new Stripe(secret.stripe_secret as string)

// create  payment intent
async function createPaymentIntentService(price: number) {
  const amount = price * 100
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: amount,
      payment_method_types: ['card'],
    })
    return paymentIntent.client_secret
  } catch (error) {
    console.error('Error in createPaymentIntentService:', error)
  }
}

//create random order ID (14)
function generateRandomOrderId(): string {
  return crypto.randomBytes(7).toString("hex").toUpperCase();
}

// save order
async function saveOrderService(
  amount: number,
  paymentIntentId: string,
  products: any[],
  shipCost: string,
  status: string,
  userInfo: ISaveOrderUserInfo
) {
  const connection = await pool.getConnection(); // Transaction
  try {
    const orderID = generateRandomOrderId();

    await connection.beginTransaction();

    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO orders 
       (amount, payment_intent_id, products, shipCost, status, username, user_id, company, state, country, address, city, zip_code, phone, email, order_note, orderID) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        amount,
        paymentIntentId,
        JSON.stringify(products),
        shipCost,
        status,
        userInfo.username,
        userInfo.userId,
        userInfo.company || null,
        userInfo.state,
        userInfo.country,
        userInfo.address,
        userInfo.city,
        userInfo.zipCode,
        userInfo.phone,
        userInfo.email,
        userInfo.orderNote || null,
        orderID,
      ]
    );

    for (const product of products) {
      const productId = product.id;
      const orderQuantity = product.orderQuantity;

      const [rows] = await connection.query<(IProductDT & RowDataPacket)[]>(
        `SELECT stock FROM product WHERE id = ?`,
        [productId]
      );      

      if (rows.length === 0) {
        throw new ApiError(404, `Product with ID ${productId} not found`);
      }

      const currentStock = rows[0].stock;

      if (currentStock < orderQuantity) {
        throw new ApiError(
          400,
          `Insufficient stock for product ID ${productId}. Available: ${currentStock}, Ordered: ${orderQuantity}`
        );
      }

      await connection.query(
        `UPDATE product SET stock = stock - ? WHERE id = ?`,
        [orderQuantity, productId]
      );

      product.quantityAvailable = currentStock - orderQuantity;
    }

    await connection.commit();

    return {
      id: result.insertId,
      orderID,
      products,
    };
  } catch (error) {
    await connection.rollback();
    console.error('Error in saveOrderService:', error);
    throw new ApiError(500, 'Error in saveOrderService');
  } finally {
    connection.release();
  }
}


// get order by id
async function getOrderByIdService(orderId: string): Promise<IOrderRes | null> {
  try {
    const [rows] = await pool.query<IOrderRes[]>(
      `SELECT * FROM orders WHERE id = ?`,
      [orderId]
    )

    if (rows.length > 0) {
      return rows[0] // Return the first row (since IDs are unique)
    } else {
      return null // Return null if no order is found
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    throw new ApiError(500, 'Could not fetch order')
  }
}


async function getOrderByUserService (userId:string)  {
  try {

    // Total number of documents (orders)
    const totalDocQuery = `SELECT COUNT(*) AS total FROM orders WHERE user_id = ?`;
    const [[totalDocResult]] = await pool.execute<IUserOrdersRes[]>(totalDocQuery, [userId]);
    const totalDoc = totalDocResult.total;

    // Total pending order count and sum
    const totalPendingQuery = `
      SELECT COUNT(*) AS count, SUM(amount) AS total 
      FROM orders 
      WHERE status = 'pending' AND user_id = ?
    `;
    const [[totalPendingOrder]] = await pool.execute<IUserOrdersRes[]>(totalPendingQuery, [userId]);

    // Total processing order count and sum
    const totalProcessingQuery = `
      SELECT COUNT(*) AS count, SUM(amount) AS total 
      FROM orders 
      WHERE status = 'processing' AND user_id = ?
    `;
    const [[totalProcessingOrder]] = await pool.execute<IUserOrdersRes[]>(totalProcessingQuery, [userId]);

    // Total delivered order count and sum
    const totalDeliveredQuery = `
      SELECT COUNT(*) AS count, SUM(amount) AS total 
      FROM orders 
      WHERE status = 'delivered' AND user_id = ?
    `;
    const [[totalDeliveredOrder]] = await pool.execute<IUserOrdersRes[]>(totalDeliveredQuery, [userId]);

    // Query for paginated orders
    const ordersQuery = `
      SELECT * FROM orders 
      WHERE user_id = ? 
      ORDER BY id DESC
    `;
    const [orders] = await pool.execute<IOrderRes[]>(ordersQuery, [userId]);

    // Sending response
    return {
      orders:orders.map((order)=>{
        return {
          id:order.id,
          amount:order.amount,
          products:order.products,
          status:order.status,
          username:order.username,
          user_id:order.user_id,
          email:order.email,
          createdAt:order.created_at,
        }
      }),
      pending: totalPendingOrder.count || 0,
      processing: totalProcessingOrder.count || 0,
      delivered: totalDeliveredOrder.count || 0,
      totalDoc,
    };
  } catch (error) {
    console.log(error, 'error');	
  }
};

// Get all orders with count
async function getAllOrdersService() {
  try {
    const [orders] = await pool.query<IOrderRes[]>(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );

    const [[countResult]] = await pool.query<{ countAll: number } & RowDataPacket[]>(
      `SELECT COUNT(*) AS countAll FROM orders`
    );

    return {
      orders,
      countAll: countResult.countAll,
    };
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw new ApiError(500, "Could not fetch orders");
  }
}

const formatDateToMySQL = (date: string | Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

async function updateOrderService(orderId: string, updatedData: Partial<IOrderRes>) {
  const connection = await pool.getConnection(); // Start a transaction
  try {
    // Begin a transaction to ensure data consistency
    await connection.beginTransaction();

    // Check if products are provided for stock updates
    if (updatedData.products) {
      const products = JSON.parse(updatedData.products as string);

      // Iterate through each product to update stock
      for (const product of products) {
        const productId = product.id;
        const newOrderQuantity = product.orderQuantity;

        // Fetch the current stock for the product
        const [rows] = await connection.query<(IProductDT & RowDataPacket)[]>(
          `SELECT stock FROM product WHERE id = ?`,
          [productId]
        );

        // If the product does not exist, throw an error
        if (rows.length === 0) {
          throw new ApiError(404, `Product with ID ${productId} not found`);
        }

        const currentStock = rows[0].stock;

        // Calculate stock changes based on the difference between old and new quantities
        const previousOrderQuantity = product.previousOrderQuantity || 0;
        const stockChange = previousOrderQuantity - newOrderQuantity;
        const updatedStock = currentStock + stockChange;

        // Prevent stock from dropping below zero
        if (updatedStock < 0) {
          throw new ApiError(
            400,
            `Insufficient stock for product ID ${productId}. Available: ${currentStock}, Tried to update with: ${newOrderQuantity}`
          );
        }

        // Update the stock in the products table
        await connection.query(
          `UPDATE product SET stock = ? WHERE id = ?`,
          [updatedStock, productId]
        );
      }
    }

    // Format created_at and updated_at fields if provided
    if (updatedData.created_at) {
      updatedData.created_at = formatDateToMySQL(updatedData.created_at);
    }
    if (updatedData.updated_at) {
      updatedData.updated_at = formatDateToMySQL(updatedData.updated_at);
    }

    // Dynamically prepare SQL fields for order updates
    const fields = Object.keys(updatedData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.entries(updatedData).map(([key, value]) =>
      key === "products" && typeof value === "object" ? JSON.stringify(value) : value
    );

    // Update the order details in the orders table
    const [result] = await connection.query<ResultSetHeader>(
      `UPDATE orders SET ${fields} WHERE id = ?`,
      [...values, orderId]
    );

    // If no rows were affected, throw an error
    if (result.affectedRows === 0) {
      throw new ApiError(404, "Order not found or no changes made");
    }

    // Commit the transaction
    await connection.commit();

    return {
      success: true,
      message: "Order updated successfully",
    };
  } catch (error) {
    // Rollback the transaction in case of errors
    await connection.rollback();
    console.error("Error updating order:", error);
    throw new ApiError(500, "Could not update order");
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}


export const OrderService = {
  createPaymentIntentService,
  saveOrderService,
  getOrderByIdService,
  getOrderByUserService,
  getAllOrdersService,
  updateOrderService,
}
