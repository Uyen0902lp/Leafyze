import { ICartType } from "./cart-type";

export type ISaveOrderUserInfo = {
  username: string;
  userId: number;
  orderID?: string;
  company?: string;
  state: string;
  country: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  orderNote?: string;
};

export type IOrderResponse = {
  id: number;
  orderID: string;
  amount: string;
  payment_intent_id: string;
  products: string;
  shipCost:number;
  created_at: string;
  updated_at: string;
  username: string;
  company: string | null;
  state: string;
  country: string;
  address: string;
  city: string;
  zip_code: string;
  phone: string;
  email: string;
  order_note: string | null;
  status: string;
};


export type IUserOrdersRes = {
  orders:{
    id:number;
    orderID: string;
    amount:string
    products:JSON;
    status:string;
    username:string;
    user_id:string;
    email:string;
    createdAt:string;
  }[];
  pending: number;
  processing: number;
  delivered: number;
  totalDoc:number;
}

export type ISaveOrderResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    orderID: string;
    [key: string]: any;
  };
};

