'use client'
import React,{ useEffect } from "react";
import Loader from "../loader/loader";
import { useGetUserOrdersQuery } from "@/redux/api/orderApiSlice";
import ErrMsg from "../err-msg";
import ProfileShape from "./profile-shape";
import ProfileNavTab from "./profile-nav-tab";
import NavProfileTab from "./nav-profile-tab";
import ProfileUpdateForm from "../form/profile-update-form";
import ChangePassForm from "../form/change-pass-form";
import MyOrders from "./my-orders";

const ProfileArea = () => {
  const { data: orderData, isError, isLoading, } = useGetUserOrdersQuery();

  let content = null;
  if (isLoading) {
    content = <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Loader loading={isLoading} />
    </div>
  }
  if (!isLoading && isError) {
    content = <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <ErrMsg msg="There was an error" />
    </div>
  }
  if (!isLoading && !isError) {
   content = <section className="profile__area pt-120 pb-120">
      <div className="container">
        <div className="profile__inner p-relative">
          <ProfileShape />
          <div className="row">
            <div className="col-xxl-4 col-lg-4">
              <div className="profile__tab mr-40">
                <ProfileNavTab />
              </div>
            </div>
            <div className="col-xxl-8 col-lg-8">
              <div className="profile__tab-content">
                <div className="tab-content" id="profile-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {orderData?.data && <NavProfileTab orderData={orderData?.data} />}
                  </div>

                  <div
                    className="tab-pane fade"
                    id="nav-information"
                    role="tabpanel"
                    aria-labelledby="nav-information-tab"
                  >
                    <div className="profile__info">
                        <h3 className="profile__info-title">Personal Details</h3>
                        <div className="profile__info-content">
                         <ProfileUpdateForm/>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    <div className="profile__password">
                      <ChangePassForm/>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="nav-order"
                    role="tabpanel"
                    aria-labelledby="nav-order-tab"
                  >
                    {orderData?.data && <MyOrders orderData={orderData?.data} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
  return (
    <>
      {content}
    </>
  );
};

export default ProfileArea;
