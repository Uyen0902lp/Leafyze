import { Request, Response } from 'express';
import catchAsync from '../../shared/createAsync';
import { BrandService } from './brand.service';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';

// create brand
const createBrand = catchAsync(async (req: Request, res: Response) => {
  const { name, description, slug, status } = req.body;
  const image = req.file?.filename ? req.file.filename : undefined;

  const result = await BrandService.createBrandService({ name, description, slug, status, image });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand created successfully!',
    data: result,
  });
});

// get all brands
const getAllBrands = catchAsync(async (req: Request, res: Response) => {
  const brands = await BrandService.getAllBrandsService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands retrieved successfully!',
    data: brands,
  });
});

export const BrandController = {
  createBrand,
  getAllBrands,
};
