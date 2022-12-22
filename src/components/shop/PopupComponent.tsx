import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { slicePrice } from "../../store/slices/shop/cart.slice";
import { closePopup } from "../../store/slices/shop/popupSlice";
import { calcCount, calcRate } from "../../store/slices/shop/products.slice";
import { addToCart } from "../../store/slices/shop/profile.slice";
import textShadow, { ITextShadow } from "../ui/textShadow";

const PopupComponent = () => {
  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const styleShadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);
  const [isHoverBtn, setIsHoverBtn] = useState(false);
  const product = useAppSelector((state) => state.shop.popup.item);
  const unparsingCart = useAppSelector((state) => state.shop.cart.unparsingCart);

  const dispatch = useAppDispatch();

  const textNeonBtn: ITextShadow = {
    color: "#fff",
    colorShadow: "#fff",
    isNeon: isNeon,
    isSetColor: true,
    styleShadow: styleShadowLight,
    activeHover: true,
    isHover: isHoverBtn,
  };

  const border = `absolute top-1/2 left-1/3 h-full w-[2px] bg-slate-500 -translate-y-1/2 -translate-x-1/2`;

  const isInCart = (id: number) => {
    const result = unparsingCart.find((value) => value.product.id === id);
    return !!result;
  };

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] 
    sm:w-1/2 md:w-5/12 lg:w-[30%] bg-[rgba(31,39,56,0.98)] rounded-2xl`}
    >
      <div className="h-full w-full flex flex-col p-2 gap-y-4 font">
        <div className="flex flex-row justify-end items-center relative horizontal-line">
          <button
            onMouseEnter={() => setIsHoverBtn(true)}
            onMouseLeave={() => setIsHoverBtn(false)}
            style={textShadow(textNeonBtn)}
            onClick={() => dispatch(closePopup())}
            className="btn-close transition-all duration-500 text-xl lg:text-2xl"
            type="button"
          >
            <i className="bi bi-x-octagon"></i>
          </button>
        </div>
        <div className="flex flex-row gap-x-3 items-center bg-white text-black p-2 rounded-lg">
          <div className="flex-[0_1_30%]">
            <div className="w-[100px] h-[100px] flex justify-center items-center">
              <img className="max-w-full max-h-full" src={product.image} alt="'product'" />
            </div>
          </div>
          <div className="flex-auto">
            <div className="font-semibold first-letter:uppercase text-sm">{product.title}</div>
          </div>
        </div>
        <div className="bg-white text-black p-2 rounded-lg">
          <div className="flex flex-col justify-between gap-y-1 text-sm min-h-[150px]">
            <div className="text-sm first-letter:uppercase">{product.description}</div>
            <div className="w-full h-full">
              <div className="flex flex-row items-center justify-center gap-x-1 text-md">
                <div className="capitalize flex-[0_1_40%]">rate:</div>
                <div className="relative border border-solid border-slate-500 h-3 w-full flex-auto rounded-sm">
                  <div
                    className={`h-full absolute 
                        ${
                          product.rating.rate < 1.6
                            ? "bg-red-600"
                            : product.rating.rate >= 1.6 && product.rating.rate < 3.2
                            ? "bg-yellow-600"
                            : "bg-green-600"
                        }`}
                    style={{ width: calcRate(product.rating.rate) + "%" }}
                  ></div>
                  <div className={border}></div>
                  <div className={border}></div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-x-1 text-md">
                <div className="capitalize flex-[0_1_40%]">count:</div>
                <div className="relative border border-solid border-slate-500 h-3 w-full flex-auto rounded-sm">
                  <div
                    className={`h-full absolute 
                    ${
                      product.rating.count < 333
                        ? "bg-red-600"
                        : product.rating.count >= 333 && product.rating.count < 667
                        ? "bg-yellow-600"
                        : "bg-green-600"
                    }`}
                    style={{ width: calcCount(product.rating.count) + "%" }}
                  ></div>
                  <div className={border}></div>
                  <div className={border}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <div className="flex-[0_1_50%] text-center">
            {!isInCart(product.id) && (
              <button
                onClick={() => dispatch(addToCart(product))}
                type="button"
                className="btn-buy bg-green-800 w-full h-7 text-white hover:bg-green-500 rounded-md transition-all duration-300"
              >
                купить
              </button>
            )}
            {isInCart(product.id) && (
              <button
                type="button"
                className="bg-orange-700 w-full h-7 text-white hover:bg-orange-500 rounded-md transition-all duration-300"
              >
                в корзине
              </button>
            )}
          </div>
          <div className="flex-[0_1_50%] text-center">
            <div className="price border border-solid border-white rounded-md">{slicePrice(product.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
