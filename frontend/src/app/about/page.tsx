import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import Footer from "@/layouts/footer/footer";
import AboutArea from "@/components/about/about-area";
import CounterArea from "@/components/counter/counter-area";
import AboutHistoryArea from "@/components/about/about-history-area";
import AboutWorkArea from "@/components/about/about-work-area";
import AboutAuthorArea from "@/components/about/about-author-area";


export const metadata: Metadata = {
  title: "About page - Leafyze",
};


export default function AboutPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>

        {/* about area */}
        <AboutArea/>
        {/* about area */}

        {/* counter area */}
        <CounterArea/>
        {/* counter area */}

        {/* about history */}
        <AboutHistoryArea/>
        {/* about history */}

        {/* about work area */}
        <AboutWorkArea/>
        {/* about work area */}

        {/* about author */}
        <AboutAuthorArea/>
        {/* about author */}

      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
