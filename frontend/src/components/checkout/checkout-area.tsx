'use client';
import React from "react";
import CheckoutCoupon from "./checkout-coupon";
import ErrMsg from "../err-msg";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import { CardElement } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/redux/hook";

export default function CheckoutArea() {
  const {handleSubmit,onSubmit,register,errors,handleCouponSubmit,setCouponCode,handleShippingCharge,shippingCharge,total,cart_products,loading} = useCheckoutSubmit();
  const {user} = useAppSelector((state) => state.auth);
  return (
      <section
        className="tp-checkout-area pb-120"
        data-bg-color="#EFF1F5"
        style={{ backgroundColor: "#EFF1F5" }}
      >
         <div className="container">
            <div className="row">
                <div className="col-xl-7 col-lg-7">
                  <div className="tp-checkout-verify">
                    <CheckoutCoupon handleCouponSubmit={handleCouponSubmit} setCouponCode={setCouponCode} />
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="tp-checkout-bill-area">
                      <h3 className="tp-checkout-bill-title">Billing Details</h3>
                      <div className="tp-checkout-bill-form">
                        <div className="tp-checkout-bill-inner">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>
                                  First Name <span>*</span>
                                </label>
                                <input {...register("fname", { required: `First Name is required!` })} type="text" placeholder="First Name" defaultValue={user?.username} />
                                <ErrMsg msg={errors.fname?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>
                                  Last Name <span>*</span>
                                </label>
                                <input {...register("lname", { required: `Last Name is required!` })} type="text" placeholder="Last Name" />
                                <ErrMsg msg={errors.lname?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>Company name (optional)</label>
                                <input {...register("company")} type="text" placeholder="company" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>Country / Region </label>
                                <input {...register("state",{ required: `State is required!` })} type="text" placeholder="Viet Nam" />
                                <ErrMsg msg={errors.state?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>Street address</label>
                                <input
                                  {...register("address",{ required: `Address is required!` })}
                                  type="text"
                                  placeholder="House number and street name"
                                />
                                <ErrMsg msg={errors.address?.message as string} />
                              </div>

                              <div className="tp-checkout-input">
                                <input
                                  type="text"
                                  placeholder="Apartment, suite, unit, etc. (optional)"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>Town / City</label>
                                <input {...register("city",{ required: `City is required!` })} type="text" placeholder="Town or City" />
                                <ErrMsg msg={errors.city?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>County</label>
                                <select {...register("country",{ required: `Country is required!` })} id="country" className="nice-select w-100">
                                  <option value="">Select Country</option>
                                  <option value="usa">United States</option>
                                  <option value="canada">Canada</option>
                                  <option value="germany">Germany</option>
                                  <option value="france">France</option>
                                  <option value="japan">Japan</option>
                                  <option value="australia">Australia</option>
                                  <option value="uk">United Kingdom</option>
                                  <option value="china">China</option>
                                  <option value="bd">Bangladesh</option>
                                  <option value="brazil">Brazil</option>
                                  <option value="south-africa">South Africa</option>
                                  <option value="south-africa">Viet Nam</option>
                                </select>
                                <ErrMsg msg={errors.country?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>Postcode ZIP</label>
                                <input {...register("zipCode",{ required: `Zip Code is required!` })} type="text" placeholder="zip-code" />
                                <ErrMsg msg={errors.zipCode?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>
                                  Phone <span>*</span>
                                </label>
                                <input {...register("phone", { required: `Phone is required!` })} type="text" placeholder="phone" />
                                <ErrMsg msg={errors.phone?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>
                                  Email address <span>*</span>
                                </label>
                                <input {...register("email", { required: `Email is required!` })} type="email" placeholder="Email" defaultValue={user?.email} />
                                <ErrMsg msg={errors.email?.message as string} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>Order notes (optional)</label>
                                <textarea {...register("orderNote")} placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    {/* checkout place order */}
                    <div className="tp-checkout-place white-bg">
                      <h3 className="tp-checkout-place-title">Your Order</h3>

                      <div className="tp-order-info-list">
                        <ul>
                          <li className="tp-order-info-list-header">
                            <h4>Product</h4>
                            <h4>Total</h4>
                          </li>
                          {cart_products?.map((product) => (
                          <li key={product.id} className="tp-order-info-list-desc">
                            <p>
                              {product.title} <span> x {product.orderQuantity}</span>
                            </p>
                            <span>
                              ${product.orderQuantity && product.price * product.orderQuantity}
                            </span>
                          </li>
                          ))}
                          <li className="tp-order-info-list-subtotal">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                          </li>
                          <li className="tp-order-info-list-shipping">
                            <span>Shipping</span>
                            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                              <span>
                                <input id="flat_rate" type="radio" name="shipping" value={20} onChange={(e) => handleShippingCharge(e.target.value)} checked={shippingCharge === 20} />
                                <label htmlFor="flat_rate">
                                  Flat rate: <span>$20.00</span>
                                </label>
                              </span>
                              <span>
                                <input
                                  id="local_pickup"
                                  type="radio"
                                  name="shipping"
                                  onChange={(e) => handleShippingCharge(e.target.value)}
                                  value={25}
                                  checked={shippingCharge === 25}
                                />
                                <label htmlFor="local_pickup">
                                  Local pickup: <span>$25.00</span>
                                </label>
                              </span>
                            </div>
                          </li>
                          <li className="tp-order-info-list-total">
                            <span>Total</span>
                            <span>${(total + shippingCharge).toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="tp-checkout-payment">
                        <div className="tp-checkout-payment-item">
                          {/* Cash on Delivery Option */}
                          <input type="radio" id="cash_on_delivery" name="payment" defaultChecked />
                          <label htmlFor="cash_on_delivery" className="mb-15">
                            Cash on Delivery (COD)
                          </label>
                        </div>
                        {/*
                        <div className="tp-checkout-payment-item">
                          <input type="radio" id="back_transfer" name="payment" />
                          <label htmlFor="back_transfer" data-bs-toggle="direct-bank-transfer" className="mb-15">
                            Direct Bank Transfer
                          </label>
                          <div className="direct-bank-transfer">
                            <CardElement
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": { color: "#aab7c4" },
                                  },
                                  invalid: { color: "#9e2146" },
                                },
                              }}
                            />
                          </div>
                        </div>
                        */}
                      </div>
                      <div className="tp-checkout-btn-wrapper">
                        <button disabled={loading} type="submit" className="tp-checkout-btn w-100">
                          {loading ? 'Processing...' : 'Place Order'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </form>
        </div>
      </section>
  );
}
