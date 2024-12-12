import { ICategory } from "@/types/category-d-t";
import { ShapeLine } from "../svg";
import CategorySlider from "./category-slider";

type IProps = {
  categories:ICategory[]
}
export default function CategoryArea({categories}:IProps) {
  return (
    <section className="tp-category-area pt-110 pb-110">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-section-title-wrapper-5 mb-50 text-center">
              <span className="tp-section-title-pre-5">
                Shop by Category
                <ShapeLine />
              </span>
              <h3 className="tp-section-title-5">
                Popular on the Leafyze store.
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-category-slider-5">
              <CategorySlider categories={categories} />
              <div className="tp-category-5-swiper-scrollbar tp-swiper-scrollbar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
