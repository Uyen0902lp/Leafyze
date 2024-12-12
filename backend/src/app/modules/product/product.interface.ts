import { RowDataPacket } from "mysql2";


export type IProductDT = {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    sku: string;
    discount: number;
    final_price: number;
    category_id: number;
    brand_id: number;
    slug: string;
    parent_category_id?: number;
}

export type ICountResult = {
  count: number;
}

export type IMaxPriceResult = {
  max_price: number;
}

export type ProductCountResult = {
  totalCount: number;
} & RowDataPacket

export type IProductResult = {
  products:IProductDT
} & RowDataPacket