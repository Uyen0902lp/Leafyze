import { Metadata } from "next";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import Dashboard from "@/components/admin-dashboard/admin-dashboard";
import Footer from "@/layouts/footer/footer";
import HeaderArea from "@/layouts/header/header-area";

export const metadata: Metadata = {
  title: "Admin page - Leafyze",
};

export default function HistoryPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* history area */}
        <Dashboard />
        {/* history area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* <Footer clr="#fff"/> */}
      {/* footer area */}
    </Wrapper>
  );
}
