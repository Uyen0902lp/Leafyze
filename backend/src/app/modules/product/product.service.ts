import pool from '../../../db';
import { RowDataPacket } from 'mysql2';
import { ICountResult, IMaxPriceResult, IProductDT, IProductResult, ProductCountResult } from './product.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// add product service
const addProductService = async (product: IProductDT) => {
  const sql = `INSERT INTO product (title, description, price, stock, image, discount, category_id, brand_id, sku, slug, parent_category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  // Insert the product into the database
  const [result] = await pool.execute(sql, [
    product.title,
    product.description,
    product.price,
    product.stock,
    product.image,
    product.discount,
    product.category_id,
    product.brand_id,
    product.sku,
    product.slug,
    product.parent_category_id ?? 0,
  ]);

  return result;
};
// get products service

const getProductService = async (categoryId?: number, limit = 8, page = 1) => {
  const offset = (page - 1) * limit;

  // Updated SQL to include total_ratings and average_rating
  let sql = `
    SELECT 
      p.id,
      p.title,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.brand_id,
      c.title AS category_name,
      COUNT(r.id) AS total_ratings,
      ROUND(AVG(r.rating), 1) AS average_rating
    FROM 
      product p
    INNER JOIN 
      category c ON p.category_id = c.id
    LEFT JOIN
      ratings r ON p.id = r.product_id
  `;

  const params: number[] = [];

  // If a category ID is provided, add a condition for it
  if (categoryId) {
    sql += ` WHERE p.parent_category_id = ? `;
    params.push(categoryId);
  }

  // Group by product fields to enable aggregation for ratings
  sql += `
    GROUP BY 
      p.id, p.title, p.slug, p.description, p.price, p.stock, 
      p.image, p.discount, p.final_price, p.brand_id, c.title
  `;

  // Add pagination (LIMIT and OFFSET)
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  // Execute the query with the provided parameters
  const [result] = await pool.execute<IProductResult[]>(sql, params);
  return result;
};


// get total product count
const getTotalProductCount = async () => {
  const sql = `SELECT COUNT(*) as count FROM product`;
  const [result] = await pool.execute<ICountResult[] & RowDataPacket[]>(sql);
  return result[0].count;
};


// get best sell products 
const getBestSellsProductsService = async (limit = 3) => {
  const sql = `SELECT 
      p.id,
      p.title,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.brand_id,
      SUM(s.quantity) AS total_sales,
      COUNT(r.id) AS total_ratings,
      ROUND(AVG(r.rating), 1) AS average_rating,
      c.title AS category_name
  FROM 
      product p
  JOIN 
      sales s ON p.id = s.product_id
  LEFT JOIN 
      ratings r ON p.id = r.product_id
  JOIN 
      category c ON p.category_id = c.id
  GROUP BY 
      p.id, p.title, p.final_price, p.image, c.title
  ORDER BY 
      total_sales DESC
  LIMIT ${limit};
  `;
  const [rows] = await pool.execute(sql, [limit]);
  return rows;
}

// get top rated products 
const getTopRatedProductsService = async (limit = 3) => {
  const sql = `SELECT 
      p.id,
      p.title,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.brand_id,
      SUM(s.quantity) AS total_sales,
      COUNT(r.id) AS total_ratings,
      ROUND(AVG(r.rating), 1) AS average_rating,
      c.title AS category_name
  FROM 
      product p
  JOIN 
      sales s ON p.id = s.product_id
  LEFT JOIN 
      ratings r ON p.id = r.product_id
  JOIN 
      category c ON p.category_id = c.id
  GROUP BY 
      p.id, p.title, p.final_price, p.image, c.title
  ORDER BY 
      average_rating DESC
  LIMIT ${limit};
  `;
  const [rows] = await pool.execute(sql, [limit]);
  return rows;
};

// get max price product
const getMaxPriceProductService = async () => {
  const sql = `SELECT MAX(final_price) AS max_price FROM product`;
  const [rows] = await pool.execute<IMaxPriceResult[] & RowDataPacket[]>(sql);
  return rows[0].max_price;
};


// get products by price range
const getProductsByPriceRangeService = async (minPrice: number,maxPrice: number) => {
  let sql = `
    SELECT 
      p.id,
      p.title,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.brand_id,
      c.title AS category_name
    FROM 
      product p
    INNER JOIN 
      category c ON p.category_id = c.id
  `;

  const params: Array<number | undefined> = [];

  if (minPrice !== undefined) {
    sql += ` WHERE p.price >= ?`;
    params.push(minPrice);
  }

  if (maxPrice !== undefined && Number.isFinite(maxPrice)) {
    sql += minPrice !== undefined ? ` AND p.price <= ?` : ` WHERE p.price <= ?`;
    params.push(maxPrice);
  }

  const [result] = await pool.execute(sql, params);
  return result;
};

// get products by category title
const getProductsByCategoryService = async (categorySlug: string | null, parentCategorySlug: string | null) => {
  let sql = `
    SELECT 
      p.id,
      p.title,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.brand_id,
      c.title AS category_name
    FROM 
      product p
    INNER JOIN 
      category c ON p.category_id = c.id
  `;

  const params: Array<string> = [];
  let conditionAdded = false;

  if (parentCategorySlug) {
    // Check for parent category products using parent_category_id in the product table
    sql += `
      LEFT JOIN category parent_c ON p.parent_category_id = parent_c.id
      WHERE parent_c.slug = ?
    `;
    params.push(parentCategorySlug);
    conditionAdded = true;
  }

  if (categorySlug) {
    // Check for direct category scenario
    sql += conditionAdded 
      ? ` AND c.slug = ? AND p.category_id = c.id` 
      : ` WHERE c.slug = ? AND p.category_id = c.id`;
    params.push(categorySlug);
  }

  const [result] = await pool.execute(sql, params);
  return result;
};

// get products by brand name
export const getProductsByBrandNameService = async (brandSlug: string) => {
  const sql = `
    SELECT 
      p.id,
      p.title,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.category_id,
      p.brand_id
    FROM 
      product p
    INNER JOIN 
      brand b ON p.brand_id = b.id
    WHERE 
      b.slug = ?
  `;

  const params: Array<string> = [brandSlug];
  const [result] = await pool.execute(sql, params);
  return result;
};

// get total product count
const getProductCountService = async () => {
  const sql = `
    SELECT COUNT(*) AS totalCount
    FROM product
  `;
  const [result] = await pool.execute<ProductCountResult[]>(sql);
  return result[0].totalCount;
};

// get related products
const getRelatedProductsService = async (categoryId: string, productId: string) => {
  const sql = `
    SELECT 
      p.id,
      p.title,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.brand_id,
      c.title as category_name
    FROM 
      product p
    INNER JOIN 
      category c ON p.category_id = c.id
    WHERE 
      p.category_id = ? 
      AND p.id != ?
    ORDER BY 
      RAND() 
    LIMIT 4
  `;

  const params: [string, string] = [categoryId, productId];
  const [results] = await pool.execute<IProductResult[]>(sql, params);

  // Return the list of related products
  return results;
};


// get single product service 
export const getSingleProductBySlugService = async (slug: string) => {
  const sql = `
    SELECT 
      p.id,
      p.title,
      p.sku,
      p.slug,
      p.description,
      p.price,
      p.stock,
      p.image,
      p.discount,
      p.final_price,
      p.brand_id,
      c.title as category_name,
      SUM(s.quantity) AS total_sales,
      COUNT(r.id) AS total_ratings,
      ROUND(AVG(r.rating), 1) AS average_rating
    FROM 
      product p
    LEFT JOIN 
      sales s ON p.id = s.product_id
    LEFT JOIN 
      ratings r ON p.id = r.product_id
    INNER JOIN 
      category c ON p.category_id = c.id
    WHERE 
      p.slug = ?
    GROUP BY 
      p.id, p.title, p.sku, p.slug, p.description, p.price, p.stock, 
      p.image, p.discount, p.final_price, p.brand_id, c.title
    LIMIT 1;
  `;

  const params: [string] = [slug];
  const [results] = await pool.execute<IProductResult[]>(sql, params);

  // Check if the product exists
  if (results.length > 0) {
    return results[0]; // Return the matching product
  } else {
    return null; // Return null if no matching product is found
  }
};

// get search products 
async function SearchProductsService(searchText: string) {
  try {
    // Convert search text to lowercase for case-insensitive matching
    const sql = `
      SELECT 
        id, title, slug, description, price, stock, image, discount, final_price 
      FROM 
        product 
      WHERE 
        LOWER(title) LIKE LOWER(?)
    `;

    // Use wildcards (%) for partial matching
    const params = [`%${searchText}%`];

    const [results] = await pool.execute<IProductResult[]>(sql, params);

    return results;
  } catch (error) {
    console.error('Error in searchProductsService:', error);
    throw new ApiError(500, 'Failed to fetch search results');
  }
}

const updateProductService = async (id: number, updatedData: Partial<IProductDT>) => {
  const fields = Object.keys(updatedData).map((key) => `${key} = ?`).join(", ");
  const values = Object.values(updatedData);

  if (!fields) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No fields provided for update");
  }

  const sql = `UPDATE product SET ${fields} WHERE id = ?`;
  const [result] = await pool.execute(sql, [...values, id]);

  if ((result as any).affectedRows === 0) {
    return null;
  }

  const updatedProduct = await getSingleProductById(id); 
  return updatedProduct;
};

const getSingleProductById = async (id: number): Promise<IProductDT | null> => {
  const sql = `
    SELECT 
      id, title, description, price, stock, image, discount, final_price, 
      sku, category_id, brand_id, slug, parent_category_id
    FROM product
    WHERE id = ?
  `;

  const [rows] = await pool.execute<IProductDT[] & RowDataPacket[]>(sql, [id]); 
  return rows.length > 0 ? rows[0] : null;
};

export const ProductService = {
  addProductService,
  getProductService,
  getBestSellsProductsService,
  getTopRatedProductsService,
  getTotalProductCount,
  getMaxPriceProductService,
  getProductsByPriceRangeService,
  getProductsByCategoryService,
  getProductsByBrandNameService,
  getProductCountService,
  getSingleProductBySlugService,
  getRelatedProductsService,
  SearchProductsService,
  updateProductService,
}
