import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCurrFilter, setSearch, toggleStateFilter } from "../../store/slices/shop/products.slice";

const ToolsComponent = () => {
  const dispatch = useAppDispatch();

  const {
    currFilter,
    filterItems: itemsFilter,
    stateCurrFilter,
  } = useAppSelector((state) => state.shop.products.filter);

  const [isHideFilters, setHideFilters] = useState(true);

  const selectFilter = (value: string) => {
    dispatch(setCurrFilter(value));
    setHideFilters(true);
  };

  return (
    <div className="w-full flex flex-row items-center bg-purple-800 px-2 gap-x-1">
      <div className="flex-[0_1_50%] relative flex flex-row items-center justify-center gap-x-3">
        <button
          onClick={() => setHideFilters(!isHideFilters)}
          type="button"
          className="btn-toggle flex flex-row items-center gap-x-1 text-xl"
        >
          <div className="">
            <i className="bi bi-funnel-fill"></i>
          </div>
          <div className="capitalize text-sm sm:text-base">{currFilter}</div>
        </button>
        <button
          onClick={() => dispatch(toggleStateFilter())}
          className={`btn-state transition-all duration-300 ${stateCurrFilter ? "-rotate-180" : ""}`}
        >
          <div className="text-2xl">
            <i className="bi bi-filter-left"></i>
          </div>
        </button>
        <div
          className={`absolute z-20 top-full md:translate-x-1/2 left-0 
          bg-purple-800 py-2 flex flex-col gap-y-3 transition-all duration-300
          ${isHideFilters ? "-top-full scale-0 opacity-0" : "top-full scale-1 opacity-1"}`}
        >
          {itemsFilter.map((item: string) => (
            <button
              key={item}
              onClick={() => selectFilter(item)}
              type="button"
              className="btn-set hover:bg-purple-500 px-5 w-full text-left"
            >
              <span className="first-letter:uppercase whitespace-nowrap text-sm sm:text-base">
                сортировать по {item}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-[0_1_50%] h-full w-full flex justify-center py-[10px]">
        <input
          onChange={(e) => {
            dispatch(setSearch(e.target.value as string));
          }}
          className="w-full sm:w-1/2 p-1 rounded-md text-black"
          type="text"
          placeholder="поиск"
        />
      </div>
    </div>
  );
};

export default ToolsComponent;
