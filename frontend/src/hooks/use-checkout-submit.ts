import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"; // Commented out

// internal
import { useGetAllCouponsQuery } from "@/redux/api/couponApi";
import { useSaveOrderMutation } from "@/redux/api/orderApiSlice";
import { useAppSelector } from "@/redux/hook";
import { ICheckoutFormData } from "@/types/form-d-t";
import { checkoutSchema } from "@/utils/schema";
import useCartInfo from "./use-cart-info";

export default function useCheckoutSubmit() {
  // cart products and offers
  const { cart_products } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const { data: offerCoupons } = useGetAllCouponsQuery();
  
  // order mutation
  const [saveOrder] = useSaveOrderMutation();
  
  // cart total and other state
  const { total, setTotal } = useCartInfo();
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();
  // const stripe = useStripe(); // Commented out
  // const elements = useElements(); // Commented out

  // form handling
  const { register, handleSubmit, formState: { errors } } = useForm<ICheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
  });

  // Submit order using only COD method
  const onSubmit = async (values: ICheckoutFormData) => {
    try {
      const saveOrderResult = await saveOrder({
        amount: total + shippingCharge,
        paymentIntentId: "",
        products: cart_products,
        shipCost: shippingCharge,
        status: "pending",
        userInfo: {
          username: `${values.fname} ${values.lname}`,
          userId: user?.id as number,
          ...values,
        },
      }).unwrap();
  
      const { id, orderID } = saveOrderResult.data;
  
      if (id && orderID) {
        localStorage.removeItem("cart_products");
        console.log("Order Saved Successfully:", { id, orderID });
        toast.success("Order placed successfully!");
        router.push(`/order/${id}`);
      } else {
        console.error("Error: Missing id or orderID", saveOrderResult);
        toast.error("Failed to save order. Please try again.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Error saving order. Please try again.");
    }
  };

  // Commented out Stripe-related code below
  /*
  useEffect(() => {
    let ignore = false;
    if (total && paymentMethod === "Stripe") {
      if (!ignore) {
        createPaymentIntent({ amount: total + shippingCharge });
      }
    }
    return () => {
      ignore = true;
    };
  }, [createPaymentIntent, total, shippingCharge]);
  */

  // handle coupon submission
  const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const coupon = offerCoupons?.data.find((c) => c.couponCode === couponCode);
    if (!coupon) {
      toast.error("Coupon not found!");
      setDiscountedTotal(0);
      return;
    }

    const currentDate = new Date();
    const expiryDate = new Date(coupon.endTime);

    if (currentDate > expiryDate) {
      toast.error("Coupon is expired!");
      setDiscountedTotal(0);
      return;
    }

    if (total < coupon.minimumAmount) {
      toast.error(`Minimum amount required for this coupon is $${coupon.minimumAmount}`);
      setDiscountedTotal(0);
      return;
    }

    const discountAmount = (coupon.discountPercentage / 100) * total;
    const newTotal = total - discountAmount;
    setTotal(newTotal);
    toast.success(`Coupon applied! You saved ${coupon.discountPercentage}%!`);
    setCouponCode('');
  };

  // handle shipping charge selection
  const handleShippingCharge = (charge: string) => {
    setShippingCharge(Number(charge));
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    setCouponCode,
    handleCouponSubmit,
    handleShippingCharge,
    shippingCharge,
    total,
    cart_products,
    loading,
  };
}
//ok