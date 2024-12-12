import express from 'express';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import uploader from '../../../utils/fileUpload';
import { BrandController } from './brand.controller';

const router = express.Router()

// create category
router.get('/show-all',BrandController.getAllBrands);

// create category
router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN),
  uploader.single('image'),
  BrandController.createBrand
);

export const BrandRoutes = router;
