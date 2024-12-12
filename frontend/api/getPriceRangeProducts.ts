export async function getMaxPriceProducts() {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/price-range-products?minPrice=10&maxPrice=100`;
  const res = await fetch(url, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
