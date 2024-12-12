import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetAllProductsQuery,
  useGetProductsByBrandQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByPriceRangeQuery,
} from "@/redux/api/productApiSlice";
import { IProduct } from "@/types/product-d-t";

export default function useProductFilter(totalProductCount: number,maxPrice:number) {
  // State to hold the current list of products to display
  const [products, setProducts] = useState<IProduct[]>([]);
  const [priceValue, setPriceValue] = useState<number[]>([0, parseInt(String(maxPrice))]);
  
  // State to hold the total count of products, initialized from the passed-in totalProductCount
  const [totalCount, setTotalCount] = useState(totalProductCount);
  // is filtering 
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Retrieve query parameters from the URL
  const searchParams = useSearchParams();
  const minQueryPrice = searchParams.get("minPrice"); // Get minimum price from query params
  const maxQueryPrice = searchParams.get("maxPrice"); // Get maximum price from query params
  const parentCategory = searchParams.get("parentCategory"); // Get parent category from query params
  const category = searchParams.get("category"); // Get subcategory from query params
  const brand = searchParams.get("brand"); // Get brand from query params
  const pageQuery = searchParams.get("page"); // Get page number from query params
  const limitQuery = searchParams.get("limit"); // Get limit of items per page from query params
  
  const router = useRouter();
  
  // State to manage the current page for pagination, initialized from the query params or defaults to 1
  const [page, setPage] = useState(pageQuery ? parseInt(pageQuery, 10) : 1);
  
  // State to manage the number of products displayed per page, initialized from the query params or defaults to 6
  const [limit, setLimit] = useState(limitQuery ? parseInt(limitQuery, 10) : 6);
  
  // State to manage the total number of pages for pagination, calculated based on totalCount and limit
  const [pageCount, setPageCount] = useState(Math.ceil(totalCount / limit));

  // Fetch all products based on the current page and limit
  const {
    data: allProducts,
    isLoading: prdLoading,
    error: allPrdError,
  } = useGetAllProductsQuery({ categoryId: null, page, limit });

  // Build category query based on parent category or subcategory
  const categoryQuery = parentCategory ? `parentCategory=${parentCategory}` : category ? `category=${category}` : null;
  
  // Fetch products by category if a category or parent category is specified in the query params
  const {
    data: categoryProducts,
    error: cateError,
    isLoading: cateLoading,
  } = useGetProductsByCategoryQuery(categoryQuery, {
    skip: !categoryQuery, // Skip this query if no category is selected
  });

  // Build price range query string using minimum and maximum prices
  const priceRangeQuery = `minPrice=${minQueryPrice}&maxPrice=${maxQueryPrice}`;

  // Fetch products within the specified price range if min and max prices are set
  const {
    data: priceRangeProduct,
    isLoading: priceRangeLoading,
    error: priceRangeError,
  } = useGetProductsByPriceRangeQuery(priceRangeQuery, {
    skip: !minQueryPrice && !maxQueryPrice, // Skip this query if no price range is specified
  });

  // Fetch products by brand if a brand is specified in the query params
  const {
    data: brandProducts,
    isLoading: brandLoading,
    error: brandError,
  } = useGetProductsByBrandQuery(`brand=${brand}`, { skip: !brand });

  // Update products based on price range filter
  useEffect(() => {
    // console.log("priceRangeProduct:", priceRangeProduct);
    let ignore = false;
    if (priceRangeProduct) {
      if (!ignore) {
        setProducts(priceRangeProduct.data); // Set products to those within the price range
        setPageCount(Math.ceil(priceRangeProduct.data.length / limit)); // Update page count based on filtered product count
      }
    }
    return () => {
      ignore = true; // Clean up to avoid setting state on an unmounted component
    };
  }, [priceRangeProduct, limit]);

  // Update products based on category filter and recalculate page count
  useEffect(() => {
    // console.log("categoryProducts:", categoryProducts);
    let ignore = false;
    if (categoryProducts) {
      if (!ignore) {
        setProducts(categoryProducts.data); // Set products to those within the selected category
        setPageCount(Math.ceil(categoryProducts.data.length / limit)); // Update page count based on filtered product count
      }
    }
    return () => {
      ignore = true; // Clean up to avoid setting state on an unmounted component
    };
  }, [categoryProducts, limit]);

  // Update products based on brand filter and update total count
  useEffect(() => {
    // console.log("brandProducts:", brandProducts);
    let ignore = false;
    if (brandProducts) {
      if (!ignore) {
         setProducts(brandProducts.data); 
      }
    }
    return () => {
      ignore = true; // Clean up to avoid setting state on an unmounted component
    };
  }, [brandProducts, limit]);

  // Update products based on the general fetch (all products) and update pagination details
  useEffect(() => {
    // console.log("Fetching allProducts:", allProducts);
    // console.log("Query Params:", { page, limit, parentCategory, brand, minQueryPrice, maxQueryPrice });
    let ignore = false;
    if (
      allProducts && 
      !parentCategory && 
      !brand && 
      !minQueryPrice && 
      !maxQueryPrice
    ) {
      if (!ignore) {
        // console.log("Setting products from allProducts:", allProducts.data.products);
        setProducts(allProducts.data.products); // Set products to the general fetch results
        setTotalCount(allProducts.data.totalCount); // Update total product count based on the general fetch
      }
    }
    return () => {
      ignore = true; // Clean up to avoid setting state on an unmounted component
    };
  }, [allProducts, page, limit, parentCategory, brand, minQueryPrice, maxQueryPrice]);

  // Handle sorting of products
  function handleSorting(item: { value: string; label: string }) {
    // Sorting products based on the selected sorting option
    if (item.value === "low") {
      setProducts([...products].sort((a, b) => a.price - b.price)); // Sort products by ascending price
    } else if (item.value === "high") {
      setProducts([...products].sort((a, b) => b.price - a.price)); // Sort products by descending price
    } else if (item.value === "new") {
      setProducts([...products].sort((a, b) => b.id - a.id)); // Sort products by new arrivals
    } else if (item.value === "sale") {
      const discount_products = products.filter((item) => item.discount > 0); // Filter products with discounts
      setProducts(discount_products);
      setPageCount(Math.ceil(discount_products.length / limit)); // Update page count based on discounted products
    }
  }

  // Consolidate loading states from all queries
  const isLoading =
    prdLoading || cateLoading || priceRangeLoading || brandLoading;

  // Reset all filters and navigate back to the shop page
  function handleReset() {
    if (allProducts) {
      setProducts(allProducts?.data?.products); // Reset products to the general fetch results
    }
    setPageCount(Math.ceil(totalCount / limit)); // Recalculate the page count
    setIsFiltering(false);
    setPriceValue([0, maxPrice]);
    router.push("/shop"); // Navigate back to the shop page without filters
  }

  // Handle page change in pagination
  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1); // Update the current page state
    if(!brand && !category){
      router.push(`/shop?page=${event.selected + 1}&limit=${limit}`); // Update URL with new page and limit
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page on page change
  };

  useEffect(() => {
    // Check for any filter to be active
    if (brand || category || parentCategory || (minQueryPrice && maxQueryPrice)) {  
      setIsFiltering(true);
    }
  }, [brand, category, minQueryPrice, maxQueryPrice, parentCategory]);
  

  return {
    products, // The filtered products to be displayed
    isLoading, // Loading state for UI feedback
    handleSorting, // Function to handle sorting of products
    handleReset, // Function to reset all filters
    handlePageClick, // Function to handle page changes in pagination
    pageCount, // Total number of pages for pagination
    isFiltering, // Flag to indicate if filters are applied
    priceValue, // The current price range
    setPriceValue, // Function to update the price range
  };
}
