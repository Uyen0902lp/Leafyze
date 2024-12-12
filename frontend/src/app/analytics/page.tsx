import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import Analytics from "@/components/analytics/analytics";
import Footer from "@/layouts/footer/footer";
import HeaderArea from "@/layouts/header/header-area";

export const metadata: Metadata = {
  title: "Analytics page - Leafyze",
};

export default function AnalyticsPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* analytics area */}
        <Analytics />
        {/* analytics area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* <Footer clr="#fff"/> */}
      {/* footer area */}
    </Wrapper>
  );
}
