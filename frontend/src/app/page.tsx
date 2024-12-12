import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import HeroBanner from "@/components/hero-banner/hero-banner";
import CategoryArea from "@/components/category/category-area";
import WeeklyDealArea from "@/components/weekly-deal";
import HomeSmProducts from "@/components/shop/home-sm-products";
import TestimonialArea from "@/components/testimonial/testimonial-area";
import HomeBestSellProducts from "@/components/shop/home-best-sell-products";
import FeatureArea from "@/components/feature/feature-area";
import CtaArea from "@/components/cta/cta-area";
import HomeProducts from "@/components/shop/home-products";
import { getCategoryData } from "../../api/getCategories";
import Footer from "@/layouts/footer/footer";

export const metadata: Metadata = {
  title: "Home page - Leafyze",
};

export default async function HomePage() {
  const categoryData = await getCategoryData();
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* hero area */}
        <HeroBanner />
        {/* hero area */}

        {/* category area */}
        <CategoryArea categories={categoryData?.data} />
        {/* category area */}

        {/* product area */}
        {/* <HomeProducts products={products?.data} /> */}
        <HomeProducts categories={categoryData?.data} />
        {/* product area */}

        {/* deal area */}
        {/* <WeeklyDealArea /> */}
        {/* deal area */}

        {/* sm product area */}
        <HomeSmProducts />
        {/* sm product area */}

        {/* testimonial area */}
        <TestimonialArea />
        {/* testimonial area */}

        {/* best sell product */}
        {/* <HomeBestSellProducts /> */}
        {/* best sell product */}

        {/* feature area */}
        <FeatureArea />
        {/* feature area */}

        {/* cta area */}
        {/* <CtaArea /> */}
        {/* cta area */}
      </main>

      {/* footer area */}
      {/* <Footer clr="#fff" /> */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
