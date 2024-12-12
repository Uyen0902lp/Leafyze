import { RowDataPacket } from "mysql2";

export type ISaveOrderUserInfo = {
    username: string;
    orderID: string;
    userId: string;
    company?: string;
    state: string;
    country: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
    email: string;
    orderNote?: string;
}


export type IOrderRes = {
    id: number;
    orderID: string;
    amount: number;
    payment_intent_id: string;
    products: string; 
    username: string;
    company?: string;
    state: string;
    country: string;
    address: string;
    city: string;
    zip_code: string;
    phone: string;
    email: string;
    order_note?: string;
    user_id: string;
    status: string;
    created_at: string;
    updated_at: string;
  } & RowDataPacket;


export type IUserOrdersRes = {
    total: number;
  } & RowDataPacket;