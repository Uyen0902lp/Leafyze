import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import Detect from "@/components/detect/detect";
import Footer from "@/layouts/footer/footer";
import HeaderArea from "@/layouts/header/header-area";

export const metadata: Metadata = {
  title: "Detect page - Leafyze",
};

export default function DetectPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* detect area */}
        <Detect />
        {/* detect area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* <Footer clr="#fff"/> */}
      {/* footer area */}
    </Wrapper>
  );
}
