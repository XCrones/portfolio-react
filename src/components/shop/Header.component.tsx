import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { showCart, showProfile } from "../../store/slices/shop/header.slice";
import CartComponent from "./Cart.component";

import style from "./Header.module.scss";
import ProfileComponent from "./Profile.component";
import ToolsComponent from "./Tools.component";

const HeaderComponent = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const sumCart = useAppSelector((state) => state.shop.cart.unparsingCart.length);
  const { isHideCart, isHideProfile } = useAppSelector((state) => state.shop.header);

  const [isHideHamburger, setHideHamburger] = useState(true);

  const toggleHamburger = () => setHideHamburger(!isHideHamburger);

  const styleProfileCart = `absolute -bottom-1 translate-y-full w-full sm:w-96 bg-purple-800 z-20 
  transition-all ease-[cubic-bezier(0.35, 0, 0.25, 1)] duration-[400ms] `;

  return (
    <div className="h-full w-full bg-purple-800 flex flex-col relative z-30">
      <nav className="h-full w-full flex flex-row justify-between items-center px-2 rounded-sm relative">
        <div className={`text-xl ${style.title}`}>
          <div className="first-letter:uppercase cursor-pointer">fake store</div>
        </div>
        <div className="flex-auto hidden sm:block">
          <ToolsComponent />
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => toggleHamburger()}
            type="button"
            className={`btn-hamburger transition-all duration-300 text-2xl 
            ${!isHideHamburger ? "scale-150" : ""}`}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
        <div className="flex flex-row items-center gap-x-3 text-[35px]">
          <div className="">
            <button onClick={() => dispatch(showProfile())} type="button" className="btn-profile">
              {isAuth && <i className="bi bi-person-check"></i>}
              {!isAuth && <i className="bi bi-person-x"></i>}
            </button>
          </div>
          <div className="">
            <button onClick={() => dispatch(showCart())} type="button" className="relative btn-cart">
              <div
                className={`absolute top-[30%] left-1/2 -translate-y-1/2 -translate-x-1/2 
              flex items-center justify-center font-bold`}
              >
                {sumCart > 0 && <div className="text-sm bg-white text-black px-1 rounded-full">{sumCart}</div>}
              </div>
              <i className="bi bi-cart2"></i>
            </button>
          </div>
        </div>
        <div className={styleProfileCart + (isHideCart ? " opacity-0 -right-full" : "opacity-1 right-0")}>
          <CartComponent />
        </div>
        <div className={styleProfileCart + (isHideProfile ? " opacity-0 -right-full" : "opacity-1 right-0")}>
          <ProfileComponent />
        </div>
      </nav>
      <div
        className={`sm:hidden absolute left-0 right-0 transition-all duration-300 
        ${isHideHamburger ? "-top-[30%] scale-0 opacity-0" : "top-full scale-1 opacity-1"}`}
      >
        <ToolsComponent />
      </div>
    </div>
  );
};

export default HeaderComponent;
