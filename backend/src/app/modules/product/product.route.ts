import express from 'express';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ProductController } from './product.controller';
import uploader from '../../../utils/fileUpload';

const router = express.Router();

// get product
router.get('/show-all',
  // auth(ENUM_USER_ROLE.ADMIN),
  ProductController.getAllProducts
);


// get best selling product
router.get('/best-sells',
  auth(ENUM_USER_ROLE.ADMIN),
  ProductController.getBestSellingProducts
);

// get top rated product
router.get('/top-rated',
  auth(ENUM_USER_ROLE.ADMIN),
  ProductController.getTopRatedProducts
);

// create product
router.post('/add',
  auth(ENUM_USER_ROLE.ADMIN),
  uploader.single('image'),
  ProductController.createProduct
);

// max price product
router.get('/max-price',
  ProductController.getMaxPrice
);

// max price product
router.get('/price-range-products',
  ProductController.getProductsByPriceRange
);

// category wise product
router.get('/category-products',
  ProductController.getProductsByCategoryTitle
);

// brand wise product
router.get('/brand-products',
  ProductController.getProductsByBrandTitle
);

// products count
router.get('/products-count',
  ProductController.getProductsCount
);

// create images
router.post('/images',
  uploader.array('images'),
  ProductController.addProductImages
);

// variations
router.post('/variations',ProductController.addProductVariants);

// search products
router.get('/search-products',ProductController.searchProducts);

// related products
router.get('/related-products',ProductController.getRelatedProducts);

// single product
router.get('/product-by-slug/:slug', ProductController.getProductBySlug);

//update product
router.patch('/update-product/:id', auth(ENUM_USER_ROLE.ADMIN), ProductController.updateProduct);

export const ProductRoutes = router;
