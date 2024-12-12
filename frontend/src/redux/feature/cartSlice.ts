import { ICartType } from "@/types/cart-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Define the state interface for the cart
interface CartState {
  cart_products: ICartType[]; // List of products currently in the cart
  orderQuantity: number; // Default quantity for adding products to the cart
}

// Initial state for the cart
let initialState: CartState = {
  cart_products: [], // Start with an empty cart
  orderQuantity: 1, // Start with a default order quantity of 1
};

// Create a slice for cart actions and state management
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a product to the cart
    add_cart_product: (state, action: PayloadAction<ICartType>) => {
      const existingProduct = state.cart_products.find(
        (item) => item.id === action.payload.id
      );

      console.log(action.payload, "action.payload");	

      if (!action.payload?.quantityAvailable) {
        // Notify user if the product is out of stock
        toast.error("Product out of stock");
        return;
      }

      if (!existingProduct) {
        // If product is not in the cart, add it
        state.cart_products.push({
          ...action.payload,
          orderQuantity: state.orderQuantity,
        });
        toast.success(`${action.payload.title} added to cart`);
      } else {
        const newQuantity =
          (existingProduct.orderQuantity || 0) + (state.orderQuantity || 0);
        if (newQuantity > existingProduct.quantityAvailable) {
          // If new quantity exceeds available stock, notify user
          toast.error("Quantity exceeds available inventory");
        } else {
          // Update the quantity of the existing product in the cart
          state.cart_products = state.cart_products.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                orderQuantity: newQuantity,
              };
            }
            return item;
          });
          toast.success(`${action.payload.title} quantity updated in cart`);
        }
      }

      state.orderQuantity = 1; // Reset order quantity to default
      // Save updated cart to local storage
      localStorage.setItem(
        "cart_products",
        JSON.stringify(state.cart_products)
      );
    },

    // Action to increment the order quantity
    increment: (state) => {
      state.orderQuantity = state.orderQuantity + 1;
    },

    // Action to decrement the order quantity, but not below 1
    decrement: (state) => {
      state.orderQuantity =
        state.orderQuantity > 1
          ? state.orderQuantity - 1
          : (state.orderQuantity = 1);
    },

    // Action to decrement the quantity of a specific product in the cart
    quantityDecrement: (state, action: PayloadAction<ICartType>) => {
      state.cart_products = state.cart_products.map((item) => {
        if (item.id === action.payload.id) {
          if (item.orderQuantity && item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
          }
        }
        // Notify user of quantity decrement
        return { ...item };
      });
      
      if(action.payload.orderQuantity !== 1){
        toast.error(`${action.payload.title} Quantity Decrement`);
      }
      // Save updated cart to local storage
      localStorage.setItem(
        "cart_products",
        JSON.stringify(state.cart_products)
      );
    },

    // Action to remove a product from the cart
    remove_product: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      state.cart_products = state.cart_products.filter(
        (item) => item.id !== action.payload.id
      );
      // Save updated cart to local storage
      localStorage.setItem(
        "cart_products",
        JSON.stringify(state.cart_products)
      );
      // Notify user of product removal
      toast.error(`${action.payload.title} Removed from cart`);
    },

    // Action to reset the order quantity to the default value
    initialOrderQuantity: (state) => {
      state.orderQuantity = 1;
    },

    // Action to clear all items from the cart
    clearCart: (state) => {
      const isClearCart = window.confirm(
        "Are you sure you want to remove all items?"
      );
      if (isClearCart) {
        state.cart_products = []; // Clear cart products
      }
      // Save updated cart to local storage
      localStorage.setItem(
        "cart_products",
        JSON.stringify(state.cart_products)
      );
    },

    // Action to load cart products from local storage
    getCartProducts: (state) => {
      state.cart_products = JSON.parse(
        localStorage.getItem("cart_products") || "[]"
      );
    },
  },
});

// Exporting actions for use in components
export const {
  add_cart_product,
  increment,
  decrement,
  quantityDecrement,
  remove_product,
  initialOrderQuantity,
  clearCart,
  getCartProducts,
} = cartSlice.actions;

// Export the reducer for use in the store
export default cartSlice.reducer;
