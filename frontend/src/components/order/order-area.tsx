'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import logo from "@/assets/images/logo/logo.svg";
import tomato_logo from "@/assets/images/logo/logo-tomato.svg";
import { IOrderResponse } from '@/types/order-d-t';
import ReactToPrint from 'react-to-print';
import { ICartType } from '@/types/cart-type';


type IProps = {
    order:IOrderResponse
}

export default function OrderArea({order}:IProps) {
  const {username,address,city,country,state,zip_code,phone,email,shipCost,amount,products,id,created_at, orderID} = order || {};
  const printRef = useRef<HTMLDivElement | null>(null);
  // const order_products:ICartType[] = JSON.parse(products);
  const order_products: ICartType[] = typeof products === 'string' ? JSON.parse(products) : products;
  return (
    <>
    {order ? (
      <section className="invoice__area pt-120 pb-120">
      <div className="container">
        <div className="invoice__msg-wrapper">
          <div className="row">
            <div className="col-xl-12">
              <div className="invoice_msg mb-40">
                <p className="alert alert-success" style={{backgroundColor: '#CBB8D3', borderColor: '#AD99B4', color: '#452c6d'}}>Thank you <strong>{username}</strong> for shopping at Leafyze. 🎉 🎉 🎉 Your order has been received and will arrive soon 🚚! </p>
              </div>
            </div>
          </div>
        </div>
        <div ref={printRef} className="invoice__wrapper pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper rounded" style={{backgroundColor: '#F3F9F2'}}>
          <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
            <div className="row">
              <div className="col-xl-12">
                <div className="invoice__header pb-20">
                  <div className="row align-items-end">
                    <div className="col-md-4 col-sm-6">
                      <div className="invoice__left">
                        <Image src={tomato_logo} alt="logo" className='mb-10' />
                        <p>{address} <br /> {city}, {country} </p>
                      </div>
                    </div>
                    <div className="col-md-8 col-sm-6">
                      <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                        <h3 className="text-uppercase font-70 mb-20">Invoice</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice__customer mb-30">
            <div className="row">
              <div className="col-md-6 col-sm-8">
                <div className="invoice__customer-details">
                  <h4 className="mb-10 text-uppercase">{username}</h4>
                  <p className="mb-0 text-uppercase">{country}</p>
                  <p className="mb-0 text-uppercase">{city}</p>
                  <p className="mb-0">{phone}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-4">
                <div className="invoice__details mt-md-0 mt-20 text-md-end">
                  <p className="mb-0">
                    <strong>Order ID:</strong> {orderID}
                  </p>
                  <p className="mb-0">
                    <strong>Date:</strong> {dayjs(created_at).format("MMMM D, YYYY")}
                  </p>
                  <p className="mb-0">
                    <strong>Payment method:</strong> COD
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice__order-table bg-white">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th scope="col">SL</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {products && order_products?.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{item.title}</td>
                    <td className="text-center">{item.orderQuantity}</td>
                    <td className="text-center">${item.price}</td>
                    <td className="text-center">${item.orderQuantity && item.price * item.orderQuantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="text-end font-weight-bold"><strong>Total</strong></td>
                  <td className="font-weight-bold text-center">
                  ${order_products?.reduce((acc, item) => acc + (item.price * (item.orderQuantity ?? 0)), 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="invoice__shippint-cost mb-30">
                  <h5 className="mb-0">Shipping Cost</h5>
                  <p className="tp-font-medium">${shipCost}</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="invoice__total-ammount mb-30 text-end">
                  <h5 className="mb-0">Total Ammount</h5>
                  <p className="tp-font-medium text-danger">
                    <strong>${parseFloat(amount).toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invoice__print text-end mt-3">
          <div className="row">
            <div className="col-xl-12">
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    className="tp-invoice-print tp-btn tp-btn-black"
                  >
                    <span className="mr-5">
                      <i className="fa-regular fa-print"></i>
                    </span>{" "}
                    Print
                  </button>
                )}
                content={() => printRef.current}
                documentTitle="Invoice"
              />
            </div>
          </div>
        </div>
      </div>
      
    </section>
    ) : (
      <div className='text-center mt-50'>
        <h3>No order found</h3>
      </div>
    )}
    </>
  )
}
//root