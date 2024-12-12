import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import BreadcrumbArea from "@/components/breadcrumb/breadcrumb-area";
import Footer from "@/layouts/footer/footer";
import CheckoutArea from "@/components/checkout/checkout-area";
import StripeProvider from "@/components/provider/stripe-provider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout page - Leafyze",
};

export default async function CheckoutPage() {
  const cookieStore = cookies()
  const user = cookieStore.get('userInfo');
  if(!user){
    redirect('/login')
  }
  return (
    <Wrapper>
      
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* breadcrumb area */}
        <BreadcrumbArea title="Checkout" subtitle="Checkout" bg_clr="#EFF1F5" />
        {/* breadcrumb area */}

        <StripeProvider>
          {/* checkout area */}
          <CheckoutArea />
          {/* checkout area */}
        </StripeProvider>
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
