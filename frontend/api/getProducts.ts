

export async function getProductData(categoryId?: number, limit?: number, page?: number) {
  let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/show-all`;
  const params = new URLSearchParams();
  
  if (categoryId) {
      params.append('categoryId', categoryId.toString());
  }
  
  if (limit) {
      params.append('limit', limit.toString());
  }
  
  if (page) {
      params.append('page', page.toString());
  }

  if (params.toString()) {
      url += `?${params.toString()}`;
  }

  try {
      const res = await fetch(url, {
          cache: 'no-store'
      });

      if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      }

      return res.json();
  } catch (error) {
      console.error('Fetch error:', error);
      throw error;
  }
}


export async function getBestSellingProducts(limit=3) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/best-sells?limit=${limit}`;
  const res = await fetch(url, {
    next:{
      revalidate: 500,
      tags: ['best-selling-product']
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getTopRatedProducts(limit=3) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/top-rated?limit=${limit}`;
  const res = await fetch(url, {
    next:{
      revalidate: 500,
      tags: ['top-rated-product']
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getMaxPrice() {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/max-price`;
  const res = await fetch(url, {
    cache: 'force-cache'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
