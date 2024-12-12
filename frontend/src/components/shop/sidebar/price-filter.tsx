import React from "react";
import InputRange from "@/components/ui/input-range";
import { useRouter } from "next/navigation";

// Prop type
type IProps = {
  maxPrice: number;
  priceValue: number[];
  setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function PriceFilter({ priceValue,setPriceValue,maxPrice}: IProps) {
  const router = useRouter();

  function handleChanges(values: number[]) {
    setPriceValue(values);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`?minPrice=${priceValue[0]}&maxPrice=${priceValue[1]}`);
  }

  return (
    <div className="tp-shop-widget-content">
      <form onSubmit={handleSubmit}>
        <div className="tp-shop-widget-filter">
          <div id="slider-range" className="mb-10">
            <InputRange
              STEP={1}
              MIN={0}
              MAX={maxPrice}
              values={priceValue}
              handleChanges={handleChanges}
            />
          </div>
          <div className="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
            <span className="input-range">
              ${priceValue[0]} - ${priceValue[1]}
            </span>
            <button className="tp-shop-widget-filter-btn" type="submit">
              Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
