import React, { useEffect, useState } from "react";
import usePaginator from "../../hooks/paginator";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useWindowSize } from "../../hooks/windowResize";
import { builderNeonText } from "../../store/slices/shadow.slice";
import { slicePrice, sliceString } from "../../store/slices/shop/cart.slice";
import { showCart, showProfile } from "../../store/slices/shop/header.slice";
import { buy, decrementItem, deleteItem, incrementItem, updateProfile } from "../../store/slices/shop/profile.slice";

const CartComponent = () => {
  const dispatch = useAppDispatch();

  const isNeon = useAppSelector((state) => state.appCommon.neon.value);
  const shadowLight = useAppSelector((state) => state.appCommon.shadow.stylesShadow.light);

  const { unparsingCart: cart } = useAppSelector((state) => state.shop.cart);
  const isLoadData = useAppSelector((state) => state.shop.profile.isLoad.cart);

  const [titleLength, setTitleLength] = useState(30);
  const { currentData, pages, isCurrentPage, jumpPage } = usePaginator(4, cart);
  const { windowWidth } = useWindowSize();

  const makePathImgLoad = (name: string): string => require(`../../assets/img/${name}.svg`);

  const totalPrice = (): number => {
    if (cart.length > 0) {
      const sums = cart.map((item) => item.product.price * item.count);
      const result = sums.reduce(function (sum, current) {
        return sum + current;
      }, 0);
      return result;
    }

    return 0;
  };

  const resizeTitle = (width: number) => (width < 640 ? setTitleLength(20) : setTitleLength(30));

  useEffect(() => {
    resizeTitle(windowWidth);
  }, [windowWidth]);

  const increment = async (id: number) => {
    await dispatch(incrementItem(id));
    await dispatch(updateProfile());
  };

  const decrement = async (id: number) => {
    await dispatch(decrementItem(id));
    await dispatch(updateProfile());
  };

  const makePurchase = () => {
    dispatch(buy());
    dispatch(showProfile());
  };

  return (
    <div className="h-[400px] w-full px-2 py-2 flex flex-col gap-y-3">
      <div className="flex flex-row justify-between items-center">
        <h3 className="flex-auto flex justify-center capitalize text-lg">??????????????</h3>
        <button
          onClick={() => dispatch(showCart())}
          onMouseEnter={(event) => {
            const neonText = builderNeonText(shadowLight, "#fff", true, isNeon);
            event.currentTarget.style.textShadow = neonText.textShadow;
            event.currentTarget.style.color = neonText.color;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.textShadow = "";
          }}
          type="button"
          className="btn-close text-xl transition-all duration-300"
        >
          <i className="bi bi-arrow-right-square"></i>
        </button>
      </div>
      <div className="flex-auto flex flex-col gap-y-2 relative">
        {cart.length < 1 && (
          <div className="h-full flex justify-center items-center">
            {!isLoadData && <span className="first-letter:uppercase">?????????????? ??????????..</span>}
          </div>
        )}
        {isLoadData && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="h-24 w-24">
              <img className="max-h-full max-w-full" src={makePathImgLoad("load")} alt="load" />
            </div>
          </div>
        )}
        {currentData().map((item) => (
          <div
            key={item.product.id}
            className="flex flex-row justify-between items-center gap-x-3 px-2 bg-white text-black p-1 rounded-md"
          >
            <div className="w-12 h-[50px]">
              <img className="max-w-full max-h-full" src={item.product.image} alt="'product'" />
            </div>
            <div className="flex-auto flex flex-col justify-between">
              <div className="font-semibold first-letter:uppercase text-sm">
                {item.product.title.length > titleLength
                  ? sliceString(item.product.title, titleLength)
                  : item.product.title}
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex-auto flex flex-row items-center">
                  <button
                    onClick={() => decrement(item.product.id)}
                    onMouseEnter={(event) => {
                      const neonText = builderNeonText(shadowLight, "#dc2626", true, isNeon);
                      event.currentTarget.style.textShadow = neonText.textShadow;
                      event.currentTarget.style.color = neonText.color;
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.textShadow = "";
                    }}
                    type="button"
                    className="btn-decr text-red-600 text-lg transition-all duration-300"
                  >
                    <i className="bi bi-dash-square-fill"></i>
                  </button>
                  <div className="flex-[0_1_40px] text-center font-semibold">
                    <span>{item.count}</span>
                  </div>
                  <button
                    onClick={() => increment(item.product.id)}
                    onMouseEnter={(event) => {
                      const neonText = builderNeonText(shadowLight, "#16a34a", true, isNeon);
                      event.currentTarget.style.textShadow = neonText.textShadow;
                      event.currentTarget.style.color = neonText.color;
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.textShadow = "";
                    }}
                    type="button"
                    className="btn-incr text-green-600 text-lg transition-all duration-300"
                  >
                    <i className="bi bi-plus-square-fill"></i>
                  </button>
                </div>
                <div className="font-semibold text-xs leading-6 sm:text-base">
                  {slicePrice(item.count * item.product.price)}
                </div>
              </div>
            </div>
            <div className="">
              <button
                onClick={() => dispatch(deleteItem(item.product.id))}
                onMouseEnter={(event) => {
                  const neonText = builderNeonText(shadowLight, "#991b1b", true, isNeon);
                  event.currentTarget.style.textShadow = neonText.textShadow;
                  event.currentTarget.style.color = neonText.color;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.textShadow = "";
                }}
                type="button"
                className="btn-delete text-red-800 text-2xl transition-all duration-300"
              >
                <i className="bi bi-x-square-fill"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-1">
        {pages().map((page, idx) => (
          <button
            onClick={() => jumpPage(idx)}
            key={idx}
            type="button"
            className={`btn-page border-0 bg-gray-600 w-7 h-7 text-center rounded-sm 
            transition-all duration-300 flex justify-center items-center
            ${isCurrentPage(idx) ? "bg-paginator-select" : ""}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <div className="flex flex-row items-center gap-x-3">
        <div className="flex-[0_1_50%] text-center">
          <button
            disabled={cart.length < 1}
            onClick={() => makePurchase()}
            type="button"
            className={`btn-buy w-full h-7 text-white rounded-md transition-all duration-300
            ${cart.length > 0 ? "bg-orange-700 hover:bg-orange-500" : "bg-slate-600 cursor-not-allowed"}`}
          >
            ????????????????
          </button>
        </div>
        <div className="flex-[0_1_50%] text-center">
          <div className="border border-solid border-white rounded-md">{slicePrice(totalPrice())}</div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
