import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/header/header";
import Wrapper from "@/layouts/wrapper";
import BreadcrumbThree from "@/components/breadcrumb/breadcrumb-3";
import { getProductBySlug } from "@/api/get-product-by-slug";
import ShopDetailsArea from "@/components/shop/details/shop-details-area";
import { IDBResponseDT } from "@/types/db-response-dt";
import { IProduct } from "@/types/product-d-t";
import Footer from "@/layouts/footer/footer";

export const metadata: Metadata = {
  title: "Shop details page - Leafyze",
};

export default async function ShopDetailsPage({params}:{params:{slug:string}}) {
  const product: IDBResponseDT<IProduct> = await getProductBySlug(params.slug);

  return (
    <Wrapper>
      {/* header area */}
      <Header />
      {/* header area */}

      <main>
        {/* breadcrumb area */}
        <BreadcrumbThree
          category={product.data?.category_name}
          slug={product.data?.slug}
        />
        {/* breadcrumb area */}

        {/* shop details area */}
        <ShopDetailsArea product={product.data} />
        {/* shop details area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
