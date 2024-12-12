import React from "react";

// prop type 
type IProps = {
  handleCouponSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function CheckoutCoupon({handleCouponSubmit,setCouponCode}: IProps) {
  const [showCoupon, setShowCoupon] = React.useState(false);
  return (
    <div className="tp-checkout-verify-item">
      <p className="tp-checkout-verify-reveal">
        Have a coupon?{" "}
        <button onClick={() => setShowCoupon(!showCoupon)} type="button" className="tp-checkout-coupon-form-reveal-btn">
          Click here to enter your code
        </button>
      </p>

      {showCoupon && (
        <div id="tpCheckoutCouponForm" className="tp-return-customer">
          <form onSubmit={handleCouponSubmit}>
            <div className="tp-return-customer-input">
              <label>Coupon Code :</label>
              <input type="text" placeholder="Coupon" onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
            </div>
            <button
              type="submit"
              className="tp-return-customer-btn tp-checkout-btn"
            >
              Apply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
