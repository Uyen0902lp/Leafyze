import React from "react";
import { getCategoryData } from "@/api/getCategories";
import Header from "./header";

export default async function HeaderArea() {
  const categoryData = await getCategoryData();
  return (
    <>
      <Header categories={categoryData?.data} />
    </>
  );
}
