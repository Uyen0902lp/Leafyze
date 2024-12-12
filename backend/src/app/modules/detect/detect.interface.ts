import { RowDataPacket } from 'mysql2';

export type Disease = {
  id: number;
  name: string;
  pathogen: string;
  symptoms: string;
  conditions: string;
  prevention: string;
  is_healthy: boolean;
} & RowDataPacket;

export type SuggestedProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  discount: number;
  final_price: number;
  category_id: number;
  brand_id: number;
  sku: string;
  slug: string;
} & RowDataPacket;

export type PredictionHistory = {
  id: number;
  user_id: number;
  disease_id: number;
  disease_name: string;
  accuracy: number;
  image_url: string;
  predicted_time: string;
  suggested_products: SuggestedProduct[];
} & RowDataPacket;

export interface FastAPIResponse {
  class: string;
  confidence: number;
}