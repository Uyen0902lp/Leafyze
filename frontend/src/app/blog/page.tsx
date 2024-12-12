import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import Footer from "@/layouts/footer/footer";
import BreadcrumbAreaTwo from "@/components/breadcrumb/breadcrumb-area-2";
import BlogArea from "@/components/blog/blog-area";

export const metadata: Metadata = {
  title: "Blog page - Leafyze",
};

export default function BlogPage() {

  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>

        {/* breadcrumb area */}
        <BreadcrumbAreaTwo/>
        {/* breadcrumb area */}

        {/* blog area */}
        <BlogArea/>
        {/* blog area */}

      </main>

      {/* footer area */}
      <Footer/>
      {/* footer area */}
    </Wrapper>
  )
}
