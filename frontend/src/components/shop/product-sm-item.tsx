import Image from "next/image";
import { IProduct } from "@/types/product-d-t";
import ShopRating from "./shop-ratings";
import Link from "next/link";

// prop type
type IProps = {
  product: IProduct;
};

export default function ProductSmItem({ product }: IProps) {
  return (
    <div className="tp-product-sm-item-5 d-flex align-items-center">
      <div className="tp-product-sm-thumb-5 fix">
        <Link href={`/shop-details/${product?.slug}`}>
          <Image
            src={`${product?.image}`}
            alt="product-img"
            width={140}
            height={140}
          />
        </Link>
      </div>
      <div className="tp-product-sm-content-5">
        <div className="tp-product-sm-tag-5">
          <span>
            <a href="#">{product?.category_name}</a>
          </span>
        </div>
        <h4 className="tp-product-sm-title-5">
          <Link href={`/shop-details/${product?.slug}`}>{product?.title}</Link>
        </h4>

        <ShopRating averageRating={Number(product?.average_rating)} />
        <div className="tp-product-sm-price-wrapper-5">
          <span className="tp-product-sm-price-5">${product?.final_price}</span>
        </div>
      </div>
    </div>
  );
}
