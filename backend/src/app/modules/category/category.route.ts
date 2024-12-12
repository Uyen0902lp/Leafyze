import express from 'express';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';
import uploader from '../../../utils/fileUpload';

const router = express.Router();

// create category
router.get('/show-all',CategoryController.getCategories);

// create category
router.post(
  '/add',
  auth(ENUM_USER_ROLE.ADMIN),
  uploader.single('image'),
  CategoryController.createCategory
);

export const CategoryRoutes = router;
