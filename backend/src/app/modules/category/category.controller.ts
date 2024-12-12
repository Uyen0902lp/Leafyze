import { Request, Response } from 'express';
import catchAsync from '../../shared/createAsync';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import { CategoryService } from './category.service';

// create category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { title, slug, status, parentId } = req.body;
  const image = req.file?.filename ? req.file.filename : undefined;
  const parent_id = parentId ? Number(parentId) : null;

  const result = await CategoryService.createCategoryService({
    title,
    slug,
    status,
    parentId: parent_id,
    image,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

// get categories
const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryService.getCategoriesService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully!',
    data: categories,
  });
});

export const CategoryController = {
  createCategory,
  getCategories,
};
