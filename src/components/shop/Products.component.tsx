import React from "react";
import usePaginator from "../../hooks/paginator";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { slicePrice, sliceString } from "../../store/slices/shop/cart.slice";
import { showPoup } from "../../store/slices/shop/popup.slice";
import { calcRate, filterBy, IProductItem } from "../../store/slices/shop/products.slice";
import { addToCart } from "../../store/slices/shop/profile.slice";
import style from "./Products.module.scss";

const ProductsComponent = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.shop.products.products);
  const { currFilter, stateCurrFilter } = useAppSelector((state) => state.shop.products.filter);
  const valueSearch = useAppSelector((state) => state.shop.products.search);
  const unparsingCart = useAppSelector((state) => state.shop.cart.unparsingCart);

  const sort = (arr: IProductItem[]): IProductItem[] => {
    let filter = currFilter;
    let stateFilter = stateCurrFilter;
    switch (filter) {
      case filterBy.price:
        return arr.sort((a, b) => (stateFilter ? a.price - b.price : b.price - a.price));
      case filterBy.rate:
        return arr.sort((a, b) => (stateFilter ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate));
      case filterBy.amount:
        return arr.sort((a, b) => (stateFilter ? a.rating.count - b.rating.count : b.rating.count - a.rating.count));
      default:
        return arr;
    }
  };

  const filterSearchProducts = (arr: IProductItem[]): IProductItem[] =>
    arr.filter((v) => v.title.toLowerCase().trim().includes(valueSearch.toLowerCase().trim()));

  const sortingProduct = sort([...products]);
  const filterSearch = filterSearchProducts(sortingProduct);
  const { currentData, pages, isCurrentPage, jumpPage } = usePaginator(8, filterSearch);

  const makePathImgLoad = (name: string): string => require(`../../assets/img/${name}.svg`);
  const isInCart = (id: number) => !!unparsingCart.find((value) => value.product.id === id);

  return (
    <div className="w-full h-full border-separate border-spacing-y-2 relative">
      <div className="h-full w-full flex flex-col gap-y-4 sm:flex-row">
        <div className="flex-auto flex flex-row flex-wrap gap-3 justify-center items-center">
          {currentData().map((product) => (
            <div
              key={product.id}
              className={`flex-[0_1_290px] h-44 flex flex-col justify-between p-2 rounded-lg
               bg-white text-black transition-all duration-200
               ${style["show-item"]}`}
            >
              <div className="flex flex-row h-full gap-x-2 justify-between items-center">
                <div className="flex-[0_1_50%] h-full flex flex-col gap-y-2 justify-evenly">
                  <div className="underline underline-offset-4 font-bold">{slicePrice(product.price)}</div>
                  <div className="font-semibold first-letter:uppercase text-xs">
                    {product.title.length > 50 ? sliceString(product.title, 50) : product.title}
                  </div>
                  <div className="flex flex-row items-center justify-center gap-x-1 text-md">
                    <div className="capitalize flex-[0_1_50%]">rate:</div>
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
                      <div className="absolute top-1/2 left-1/3 h-full w-[2px] bg-slate-500 -translate-y-1/2 -translate-x-1/2"></div>
                      <div className="absolute top-1/2 left-2/3 h-full w-[2px] bg-slate-500 -translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-[0_1_50%] h-[100px] flex justify-center items-center overflow-hidden">
                  <img src={product.image} alt={"product"} className="max-w-full max-h-full" />
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-2">
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
                      className="btn-cart bg-orange-700 w-full h-7 text-white hover:bg-orange-500 rounded-md transition-all duration-300"
                    >
                      в корзине
                    </button>
                  )}
                </div>
                <div className="flex-[0_1_50%] text-center">
                  <button
                    onClick={() => dispatch(showPoup(product))}
                    type="button"
                    className="btn-about bg-sky-800 w-full h-7 text-white hover:bg-sky-500 rounded-md transition-all duration-300"
                  >
                    подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row sm:flex-col justify-center items-center gap-1">
          {pages().map((page, idx) => (
            <button
              onClick={() => jumpPage(idx)}
              key={idx}
              type="button"
              className={`btn-page border-0 bg-gray-600 w-7 h-7 text-center 
              rounded-sm transition-all duration-300 flex justify-center items-center
              ${isCurrentPage(idx) ? "bg-[#0284c7]" : ""}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      {products.length < 1 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
          <img src={makePathImgLoad("load")} alt="load" />
        </div>
      )}
    </div>
  );
};

export default ProductsComponent;
