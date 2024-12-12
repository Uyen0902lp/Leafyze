/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { Express } from 'express'
import { Request, Response } from 'express'
import sendResponse from '../../shared/sendResponse'
import catchAsync from '../../shared/createAsync'
import pool from '../../../db'
import { ProductService } from './product.service'
import ApiError from '../../../errors/ApiError'

// add brand
const createProduct = catchAsync(async (req: Request, res: Response) => {
  // Insert the product into the database
  // const image = req.file?.filename ? req.file.filename : null
  const product = {
    ...req.body,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
    brand_id: Number(req.body.brand_id),
    category_id: Number(req.body.category_id),
    stock: Number(req.body.stock),
  }
  const result = await ProductService.addProductService(product)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully!',
    data: result,
  })
})

const addProductImages = catchAsync(async (req: Request, res: Response) => {
  const { product_id } = req.body
  const files = req.files as Express.Multer.File[]
  if (!product_id || !files || files.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide product_id and at least one image',
    })
  }

  const imagePaths = files.map(file => file.filename)

  // Prepare the SQL query for inserting multiple images
  const values = imagePaths.map(path => [Number(product_id), path])

  // Create a placeholder string for the values
  const placeholders = values.map(() => '(?, ?)').join(', ')

  // Insert into the product_images table
  const sql = `INSERT INTO product_images (product_id, image) VALUES ${placeholders}`
  const flattenedValues = values.flat()

  try {
    const [result] = await pool.execute(sql, flattenedValues)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product image created successfully!',
      data: result,
    })
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'An error occurred while saving product images',
      data: error,
    })
  }
})

// add product variants
const addProductVariants = catchAsync(async (req: Request, res: Response) => {
  const { product_id, size, color, sku, price, quantity, sale_price, status } = req.body;
  
  const sql = `INSERT INTO product_variation (product_id,size,color,sku,price,quantity,sale_price,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  // Insert the product into the database
  const [result] = await pool.execute(sql, [
    product_id,
    size,
    color,
    sku,
    price,
    quantity,
    sale_price,
    status,
  ])
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product variants created successfully!',
    data: result,
  })
})

// get all product
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { parentCategory, limit,page } = req.query;
  const products = await ProductService.getProductService(
    parentCategory ? Number(parentCategory) : undefined,
    limit ? Number(limit) : undefined,
    page ? Number(req.query.page) : 1
  );

  const totalCount = await ProductService.getTotalProductCount();

  const data = {
    products,
    totalCount,
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: data,
  });
});


// get best selling product
const getBestSellingProducts = catchAsync(async (req: Request, res: Response) => {
  const { limit } = req.query;
  const products = await ProductService.getBestSellsProductsService(limit ? Number(limit) : 9);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: products,
  })
});

// get best selling product
const getTopRatedProducts = catchAsync(async (req: Request, res: Response) => {
  const { limit } = req.query
  const products = await ProductService.getTopRatedProductsService(limit ? Number(limit) : 3);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: products,
  })
});

// get max price 
const getMaxPrice = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getMaxPriceProductService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: products,
  })
});

// get max price 
const getProductsByPriceRange = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);
  const products = await ProductService.getProductsByPriceRangeService(minPrice, maxPrice);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: products,
  })
});

// get products by category title
const getProductsByCategoryTitle = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const categoryTitle = query.category as string;
  const parentCategoryTitle = query.parentCategory as string;
  const products = await ProductService.getProductsByCategoryService(categoryTitle, parentCategoryTitle);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: products,
  })
});

// get products by brand title
const getProductsByBrandTitle = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const brandTitle = query.brand as string;
  const products = await ProductService.getProductsByBrandNameService(brandTitle);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: products,
  })
});

// get products total count
const getProductsCount = catchAsync(async (req: Request, res: Response) => {
  const productsTotalCount = await ProductService.getProductCountService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products count fetched successfully!',
    data: productsTotalCount,
  })
});

// get products total count
const getProductBySlug = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params?.slug
  const product = await ProductService.getSingleProductBySlugService(slug);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products count fetched successfully!',
    data: product,
  })
});

// get related products
const getRelatedProducts = catchAsync(async (req: Request, res: Response) => {
  const {categoryId,productId} = req.query;
  const categoryIdStr = typeof categoryId === 'string' ? categoryId : '';
  const productIdStr = typeof productId === 'string' ? productId : '';

  if (!categoryIdStr || !productIdStr) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category Id and Product Id are required');
  }
  const product = await ProductService.getRelatedProductsService(categoryIdStr,productIdStr);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Related Products fetched successfully!',
    data: product,
  })
});

// search products controller
const searchProducts = catchAsync(async (req: Request, res: Response) => {
  const searchText = req.query.searchText as string;

  if (!searchText || searchText.trim() === '') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Search text is required');
  }

  const products = await ProductService.SearchProductsService(searchText.trim());

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Search results fetched successfully',
    data: products,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; 
  const updatedData = req.body;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product ID is required");
  }

  const result = await ProductService.updateProductService(Number(id), updatedData);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found or update failed");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  addProductImages,
  addProductVariants,
  getAllProducts,
  getBestSellingProducts,
  getTopRatedProducts,
  getMaxPrice,
  getProductsByPriceRange,
  getProductsByCategoryTitle,
  getProductsByBrandTitle,
  getProductsCount,
  getProductBySlug,
  getRelatedProducts,
  searchProducts,
  updateProduct,
}
