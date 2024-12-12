import { cookies } from "next/headers";


export async function getCategoryData() {
  // const cookieStore = cookies()
  // const user = cookieStore.get('userInfo');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/category/show-all`,{
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
  