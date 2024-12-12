import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import BreadcrumbArea from "@/components/breadcrumb/breadcrumb-area";
import ShopArea from "@/components/shop/shop-area";
import {
  getMaxPrice,
  getProductData,
  getTopRatedProducts,
} from "@/api/getProducts";
import { IProduct, IProductResponse } from "@/types/product-d-t";
import { IDBResponseDT } from "@/types/db-response-dt";
import { getCategoryData } from "@/api/getCategories";
import { ICategory } from "@/types/category-d-t";
import { getBrands } from "@/api/get-brands";
import { IBrand } from "@/types/brand-type";
import Footer from "@/layouts/footer/footer";
import { getProductsCount } from "@/api/get-products-count";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop page - Leafyze",
};

export default async function ShopPage() {
  const productsCountData = getProductsCount();
  const maxPriceData = getMaxPrice();
  const categoryData = getCategoryData();
  const topRatedPrdData = getTopRatedProducts(3);
  const brandData = getBrands();

  const [productsCount, maxPrice, categories, topRatedProducts, brands]: [
    IDBResponseDT<number>,
    IDBResponseDT<string>,
    IDBResponseDT<ICategory[]>,
    IDBResponseDT<IProduct[]>,
    IDBResponseDT<IBrand[]>
  ] = await Promise.all([
    productsCountData,
    maxPriceData,
    categoryData,
    topRatedPrdData,
    brandData,
  ]);
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* breadcrumb area */}
        <BreadcrumbArea top_cls="pt-100 pb-50" title="Shop" subtitle="Shop" />
        {/* breadcrumb area */}

        {/* shop area */}
        <Suspense fallback={<h3>Loading...</h3>}>
          <ShopArea
            maxPrice={Number(maxPrice?.data)}
            categories={categories?.data}
            topRatedProducts={topRatedProducts?.data}
            brands={brands?.data}
            totalProductsCount={productsCount?.data}
          />
        </Suspense>
        {/* shop area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
