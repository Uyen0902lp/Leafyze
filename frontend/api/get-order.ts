export async function getOrderById(id:string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/order-by-id/${id}`;
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
