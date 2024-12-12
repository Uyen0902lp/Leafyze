export interface IProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  discount: number;
  final_price: number;
  sku: string;
  average_rating?: string;
  total_ratings?: number;
  total_sales?: string;
  category_name: string;
  brand_id: number;
  parent_category_id?: number;
}

export type IProductResponse = { 
  products: IProduct[]; 
  totalCount: number 
};
