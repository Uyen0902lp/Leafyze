export async function getProductsCount() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/products-count`
  );

  // console.log(res.json(),'res.json() p count');

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
