import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import Footer from "@/layouts/footer/footer";
import BlogDetailsArea from "@/components/blog/blog-details/blog-details-area";
import blogData from "@/data/blog-data";

export const metadata: Metadata = {
  title: "Blog page - Leafyze",
};

export default function BlogPage({ params }: { params: { id: string } }) {
  const blogId = params.id;
  const blog = blogData.find((blog) => blog.id === Number(blogId));
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* blog details area */}
        {blog ? (
          <BlogDetailsArea blog={blog} />
        ) : (
          <div className="pb-120 pt-95 text-center">
            <h2>Not Found id: {`"${blogId}"`} Blog</h2>
          </div>
        )}
        {/* blog details area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
