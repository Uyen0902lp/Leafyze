'use client';
import { useState } from "react";
import Link from "next/link";
import menu_data from "@/data/menu-data";
import logo from "@/assets/images/logo/logo.svg";
import logo_tomato from "@/assets/images/logo/logo-tomato.svg";
import Image from "next/image";
import { CloseTwo } from "../svg";

function MobileMenus() {
  const [isActiveMenu, setIsActiveMenu] = useState("");

  // handleOpenSubMenu
  const handleOpenSubMenu = (title: string) => {
    if (title === isActiveMenu) {
      setIsActiveMenu("");
    } else {
      setIsActiveMenu(title);
    }
  };
  return (
    <nav className="tp-main-menu-content">
      {menu_data.map((menu, i) => (
        <ul key={i}>
          {menu.dropdown_menus ? (
            <li
              key={menu.id}
              className={`has-dropdown ${
                isActiveMenu === menu.title ? "dropdown-opened" : ""
              }`}
            >
              <a className={`${isActiveMenu === menu.title ? "expanded" : ""}`}>
                {menu.title}
                <button
                  onClick={() => handleOpenSubMenu(menu.title)}
                  className={`dropdown-toggle-btn ${
                    isActiveMenu === menu.title ? "dropdown-opened" : ""
                  }`}
                >
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </a>
              <ul
                className={`tp-submenu ${
                  isActiveMenu === menu.title ? "active" : ""
                }`}
              >
                {menu.dropdown_menus.map((b, i) => (
                  <li key={i}>
                    <Link href={b.link}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={menu.id}>
              <Link href={menu.link}>{menu.title}</Link>
            </li>
          )}
        </ul>
      ))}
    </nav>
  );
}

// prop type
type IProps = {
  openOffCanvas: boolean;
  onToggleOffCanvas: () => void;
};

export default function OffCanvas({openOffCanvas,onToggleOffCanvas}:IProps) {
  return (
    <>
      <div
        className={`offcanvas__area offcanvas__radius ${
          openOffCanvas ? "offcanvas-opened" : ""
        }`}
      >
        <div className="offcanvas__wrapper">
          <div className="offcanvas__close">
            <button
              onClick={onToggleOffCanvas}
              className="offcanvas__close-btn offcanvas-close-btn"
            >
              <CloseTwo/>
            </button>
          </div>
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <Link href="/">
                  <Image src={logo_tomato} alt="logo" />
                </Link>
              </div>
            </div>

            <div className="tp-main-menu-mobile fix d-lg-none mb-40">
              <MobileMenus />
            </div>

          </div>
        </div>
      </div>
      {/* body overlay start */}
      <div
        onClick={onToggleOffCanvas}
        className={`body-overlay ${openOffCanvas ? "opened" : ""}`}
      ></div>
      {/* body overlay end */}
    </>
  );
}
