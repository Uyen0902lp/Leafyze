export async function getBrands() {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/brand/show-all`;
  const res = await fetch(url, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
