import pool from '../../../db';
import { IBrand } from './brand.interface';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const createBrandService = async (brandData: IBrand): Promise<ResultSetHeader> => {
  const { name, description, slug, status, image } = brandData;
  const sql = 'INSERT INTO brand (name, image, description, slug, status) VALUES (?, ?, ?, ?, ?)';
  const [result] = await pool.execute<ResultSetHeader>(sql, [name, image, description, slug, status]);
  return result;
};

const getAllBrandsService = async (): Promise<IBrand[]> => {
  const sql = 'SELECT * FROM brand';
  const [rows] = await pool.execute<IBrand[] & RowDataPacket[]>(sql);
  return rows;
};

export const BrandService = {
  createBrandService,
  getAllBrandsService,
};
