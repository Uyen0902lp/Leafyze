"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import useSticky from "@/hooks/use-sticky";
import HeaderMenu from "./header-menu";
import { Cart, Search, User, Wishlist } from "@/components/svg";
import logo from "@/assets/images/logo/logo-white.svg";
import logo_tomato from "@/assets/images/logo/logo-tomato.svg";
import HeaderTopCategories from "./header-top-cate";
import { ICategory } from "@/types/category-d-t";
import useCartInfo from "@/hooks/use-cart-info";
import { useAppSelector } from "@/redux/hook";
import CartMiniSidebar from "@/components/common/cart-sidebar";
import OffCanvas from "@/components/common/offcanvas";
import SearchForm from "@/components/form/search-form";

// prop type
type IProps = {
  categories?:ICategory[]
}

export default function Header({categories}:IProps) {
  const { sticky } = useSticky();
  const [showCategory, setShowCategory] = React.useState(false);
  const [showCartSidebar, setShowCartSidebar] = React.useState(false);
  const [showOffCanvas, setShowOffCanvas] = React.useState(false);
  const {quantity} = useCartInfo();
  const {wishlists} = useAppSelector(state => state.wishlist);
  const {user} = useAppSelector(state => state.auth);
  
  return (
    <>
     <header>
      <div
        id="header-sticky"
        className={`tp-header-area p-relative tp-header-sticky tp-header-height ${
          sticky ? "header-sticky" : ""
        }`}
      >
        <div
          className="tp-header-5 pl-25 pr-25"
          style={{ backgroundColor: "#678E61" }}
        >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xxl-2 col-xl-3 col-6">
                <div className="tp-header-left-5 d-flex align-items-center">
                  {/* <div className="tp-header-hamburger-5 mr-15 d-none d-lg-block">
                    {categories && (
                      <button className="tp-hamburger-btn-2 tp-hamburger-toggle" onClick={() => setShowCategory(!showCategory)}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    )}
                  </div> */}
                  <div className="tp-header-hamburger-5 mr-15 d-lg-none">
                    <button onClick={() => setShowOffCanvas(true)} className="tp-hamburger-btn-2 tp-offcanvas-open-btn">
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                  <div className="logo">
                    <Link href="/">
                      <Image src={logo_tomato} alt="logo" />
                    </Link>
                  </div>
                </div>
                {/* category start */}
                {categories && <HeaderTopCategories showCategory={showCategory} categories={categories} />}
                {/* category end */}
              </div>
              <div className="col-xxl-4 col-xl-6 d-none d-xl-block">
                <div className="main-menu">
                  <nav className="tp-main-menu-content">
                    {/* menus start */}
                    <HeaderMenu />
                    {/* menus end */}
                  </nav>
                </div>
              </div>
              <div className="col-xxl-4 d-none d-xxl-block">
                <div className="tp-header-search-5">
                  <SearchForm/>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-3 col-6">
                <div className="tp-header-right-5 d-flex align-items-center justify-content-end">
                  <div className="tp-header-login-5 d-none d-md-block">
                    <div className="d-flex align-items-center">
                      <div className="tp-header-login-icon-5">
                        <span>
                          <User />
                        </span>
                      </div>
                      <div className="tp-header-login-content-5">
                        <p>
                          <span className="text-capitalize">
                           {user?.username ? user?.username : 'Hello'}
                          </span> 
                          <br /> {user?.email ? 
                          <Link href={"/profile"}>Profile</Link> : 
                          <Link href={"/login"}>Login</Link>}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tp-header-action-5 d-flex align-items-center ml-20">
                    <div className="tp-header-action-item-5 d-none d-sm-block">
                      <Link href="/wishlist">
                        <Wishlist />
                        <span className="tp-header-action-badge-5">{wishlists.length}</span>
                      </Link>
                    </div>
                    <div className="tp-header-action-item-5">
                      <button onClick={() => setShowCartSidebar(true)} type="button" className="cartmini-open-btn">
                        <Cart />
                        <span className="tp-header-action-badge-5">{quantity}</span>
                      </button>
                    </div>
                    <div className="tp-header-action-item-5 d-none d-sm-block d-xxl-none">
                      <button type="button">
                        <Search />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* cart mini sidebar */}
    <CartMiniSidebar openSidebar={showCartSidebar} onShowSidebar={() => setShowCartSidebar(!showCartSidebar)} />
    {/* cart mini sidebar */}

    {/* offCanvas sidebar */}
    <OffCanvas openOffCanvas={showOffCanvas} onToggleOffCanvas={() => setShowOffCanvas(!showOffCanvas)} />
    {/* offCanvas sidebar */}
    </>
  );
}
