import { RowDataPacket } from 'mysql2';

export type CategoryRow = {
  categoryId: number;
  categoryTitle: string;
  subcategoryId: number | null;
  subcategoryTitle: string | null;
} & RowDataPacket

export type Category = {
  id: number;
  title: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
  productCount: number;
}

export type Subcategory = {
  id: number;
  title: string;
  productCount: number;
}