export async function getProductBySlug(slug:string) {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/product-by-slug/${slug}`;
    const res = await fetch(url, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  