import pool from '../../../db';
import { Category, CategoryRow } from './category.interface';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const createCategoryService = async (categoryData: {
  title: string;
  slug: string;
  status: string;
  parentId: number | null;
  image?: string;
}): Promise<ResultSetHeader> => {
  const { title, slug, status, parentId, image } = categoryData;
  const sql =
    'INSERT INTO category (title, parentId, image, slug, status) VALUES (?, ?, ?, ?, ?)';
  const [result] = await pool.execute<ResultSetHeader>(sql, [
    title,
    parentId,
    image,
    slug,
    status,
  ]);
  return result;
};

const getCategoriesService = async (): Promise<Category[]> => {
  const sql = `
    SELECT 
      c1.id AS categoryId,
      c1.title AS categoryTitle,
      c1.slug,
      c1.image AS categoryImage,
      c2.id AS subcategoryId,
      c2.title AS subcategoryTitle,
      (SELECT COUNT(*) FROM product p WHERE p.parent_category_id = c1.id) AS parentProductCount,
      (SELECT COUNT(*) FROM product p WHERE p.category_id = c2.id) AS subcategoryProductCount
    FROM 
      category c1
    LEFT JOIN 
      category c2 ON c1.id = c2.parentId
    GROUP BY 
      c1.id, c2.id
  `;

  const [rows] = await pool.query<CategoryRow[] & RowDataPacket[]>(sql);

  const categoriesMap: { [key: number]: Category } = {};
  const subcategoryIds = new Set<number>();

  rows.forEach((row) => {
    const categoryId = row.categoryId;
    if (!categoriesMap[categoryId]) {
      categoriesMap[categoryId] = {
        id: categoryId,
        title: row.categoryTitle,
        slug: row.slug,
        image: row.categoryImage,
        subcategories: [],
        productCount: row.parentProductCount,
      };
    }

    if (
      row.subcategoryId !== null &&
      row.subcategoryTitle !== null &&
      row.subcategoryId !== categoryId &&
      row.subcategoryTitle !== row.categoryTitle
    ) {
      categoriesMap[categoryId].subcategories.push({
        id: row.subcategoryId,
        title: row.subcategoryTitle,
        productCount: row.subcategoryProductCount,
      });
      subcategoryIds.add(row.subcategoryId);
    }
  });

  const categories = Object.values(categoriesMap);
  return categories.filter(
    (category) =>
      !subcategoryIds.has(category.id) || category.subcategories.length > 0
  );
};

export const CategoryService = {
  createCategoryService,
  getCategoriesService,
};
