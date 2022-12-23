import React, { useEffect, useState } from "react";
import usePaginator from "../../hooks/paginator";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { slicePrice, sliceString } from "../../store/slices/shop/cart.slice";
import { closePurchase } from "../../store/slices/shop/purchase.slice";

const PurchaseComponent = () => {
  const dispatch = useAppDispatch();

  const purchase = useAppSelector((state) => state.shop.purchase.purchase);

  const [titleLength, setTitleLength] = useState(30);

  const { currentData, pages, isCurrentPage, jumpPage } = usePaginator(4, purchase.items);

  const resizeTitle = () => {
    const width = window.innerWidth;
    width < 640 ? setTitleLength(15) : setTitleLength(30);
  };

  useEffect(() => {
    resizeTitle();
    window.addEventListener("resize", resizeTitle, true);

    return () => {
      window.removeEventListener("resize", resizeTitle, true);
    };
  }, []);

  return (
    <div className="h-full w-full px-2 py-2 flex flex-col justify-between gap-y-3">
      <div className="flex flex-row justify-between items-center">
        <h3 className="capitalize text-lg">{purchase.date}</h3>
        <h3 className="capitalize text-lg">{slicePrice(purchase.totalPrice)}</h3>
      </div>
      <div className="flex-auto h-full flex flex-col gap-y-2">
        {currentData().map((item, idx) => (
          <div
            key={idx}
            className="flex flex-row justify-between items-center gap-x-3 px-2 bg-white text-black p-1 rounded-md"
          >
            <div className="w-12 h-[50px]">
              <img className="max-w-full max-h-full" src={item.image} alt="'product'" />
            </div>
            <div className="flex-auto flex flex-col justify-between">
              <div className="font-semibold first-letter:uppercase text-sm sm:text-base">
                {item.title.length > titleLength ? sliceString(item.title, titleLength) : item.title}
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-xs leading-6 sm:text-base">
                  <span className="capitalize">count:&nbsp;</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
                <div className="font-semibold text-xs leading-6 sm:text-base">
                  {slicePrice(item.price * item.count)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-1">
        {pages().map((page, idx) => (
          <button
            key={idx}
            onClick={() => jumpPage(idx)}
            type="button"
            className={`btn-page border-0 bg-gray-600 w-7 h-7 text-center rounded-sm 
            transition-all duration-300 flex justify-center items-center
            ${isCurrentPage(idx) ? "bg-paginator-select" : ""}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <div className="w-full text-center">
        <button
          onClick={() => dispatch(closePurchase())}
          type="button"
          className="btn-back bg-sky-700 w-full h-7 text-white hover:bg-sky-500 rounded-md transition-all duration-300"
        >
          назад
        </button>
      </div>
    </div>
  );
};

export default PurchaseComponent;
