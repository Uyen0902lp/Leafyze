import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import History from "@/components/history/prediction-history";
import Footer from "@/layouts/footer/footer";
import HeaderArea from "@/layouts/header/header-area";

export const metadata: Metadata = {
  title: "Prediction History page - Leafyze",
};

export default function HistoryPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* history area */}
        <History />
        {/* history area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* <Footer clr="#fff"/> */}
      {/* footer area */}
    </Wrapper>
  );
}
