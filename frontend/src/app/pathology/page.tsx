import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import Pathology from "@/components/pathology/pathology";
import Footer from "@/layouts/footer/footer";
import HeaderArea from "@/layouts/header/header-area";

export const metadata: Metadata = {
  title: "Pathology page - Leafyze",
};

export default function PathologyPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* pathology area */}
        <Pathology />
        {/* pathology area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* <Footer clr="#fff"/> */}
      {/* footer area */}
    </Wrapper>
  );
}
