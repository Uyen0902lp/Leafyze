export async function getCoupons() {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/coupon/show-all`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
