import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import ContactArea from "@/components/contact/contact-area";
import Footer from "@/layouts/footer/footer";
import HeaderArea from "@/layouts/header/header-area";

export const metadata: Metadata = {
  title: "Contact page - Leafyze",
};

export default function ContactPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* contact area */}
        <ContactArea />
        {/* contact area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
