import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITasks, sortItems, toggleComplete } from "../../store/slices/todo/list.slice";
import { IShowModal, showModal } from "../../store/slices/todo/modal.slice";
import style from "./Table.module.scss";
interface IThead {
  title: string;
  filter: string;
}

const TableComponent = () => {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector((state) => state.todo.list);

  const theadTable: IThead[] = [
    { title: "название", filter: "name" },
    { title: "категория", filter: "category" },
    { title: "приоритет", filter: "priority" },
    { title: "дата", filter: "date" },
    { title: "статус", filter: "status" },
  ];

  const [filterSort, setFilterSort] = useState({ type: "", state: false });

  const editItem = (item: ITasks) => {};

  const buildDelete = (item: ITasks): IShowModal => {
    return {
      title: `удалить ${item.name} ?`,
      item: {
        id: item.id,
        isDeleteAll: false,
      },
    };
  };

  const toggleFilter = (value: string) => {
    const state = filterSort.type === value ? !filterSort.state : false;
    setFilterSort({
      state: state,
      type: value,
    });
  };

  const parsePriority = (value: number): string => (value === 0 ? "низкий" : value === 1 ? "средний" : "высокий");

  const resize = () => {
    const sm: number = 640;
    const md: number = 768;
    const lg: number = 1024;

    const width = window.innerWidth;

    if (width < lg) {
      const elPriority = document.getElementById("btn-filter-3");
      if (!!elPriority) {
        elPriority.style.display = "none";
      }
    } else if (width > lg) {
      const elPriority = document.getElementById("btn-filter-3");
      if (!!elPriority) {
        elPriority.style.display = "table-cell";
      }
    }

    if (width < md) {
      const elDate = document.getElementById("btn-filter-2");
      if (!!elDate) {
        elDate.style.display = "none";
      }
    } else if (width > md) {
      const elDate = document.getElementById("btn-filter-2");
      if (!!elDate) {
        elDate.style.display = "table-cell";
      }
    }

    if (width < sm) {
      const elCategori = document.getElementById("btn-filter-1");
      if (!!elCategori) {
        elCategori.style.display = "none";
      }
    } else if (width > sm) {
      const elCategori = document.getElementById("btn-filter-1");
      if (!!elCategori) {
        elCategori.style.display = "table-cell";
      }
    }
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize, true);

    return () => {
      window.removeEventListener("resize", resize, true);
    };
  }, []);

  useEffect(() => {
    dispatch(
      sortItems({
        filter: filterSort.type,
        state: filterSort.state,
      })
    );
  }, [dispatch, filterSort]);

  return (
    <table className={`w-full border-separate border-spacing-y-2 ${style.font}`}>
      <thead>
        <tr className="capitalize">
          {theadTable.map((value, idx) => (
            <th id={`btn-filter-${idx}`} key={value.title} className="border-b-2 border-solid border-white pb-2">
              <div className="flex flex-row gap-x-2 justify-center items-center">
                <div className="text-[18px] text-sm lg:text-base">{value.title}</div>
                <button
                  onClick={() => toggleFilter(value.filter)}
                  className={filterSort.type === value.filter && filterSort.state ? "rotate-180" : "rotate-0"}
                >
                  <i
                    className={`bi bi-sort-down-alt text-2xl ${
                      filterSort.type === value.filter ? "text-white" : "text-gray-600"
                    }`}
                  ></i>
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr
            onDoubleClick={() => editItem(item)}
            key={item.id}
            className={`outline outline-1 outline-[#ffffff80] text-[18px] transition-all duration-500 select-none 
            ${item.status ? "bg-[#474e5fbb] cursor-not-allowed" : "hover:bg-[#00ff9559] cursor-pointer"}`}
          >
            <td className={`px-3 py-3 relative text-sm lg:text-base ${item.status ? style.triangle : ""}`}>
              {item.name}
            </td>
            <td className="hidden sm:table-cell px-3 py-3 text-center">{item.category}</td>
            <td className="hidden md:table-cell px-3 py-3 text-center">{parsePriority(item.priority)}</td>
            <td className="hidden lg:table-cell px-3 py-3 text-center">{item.date}</td>
            <td className="px-3 py-3 text-center">
              <div className="sm:text-xl md:text-2xl text-black flex flex-row justify-center items-center gap-x-3">
                <button
                  onClick={() => editItem(item)}
                  className={`btn-edit w-6 sm:w-7 md:w-8 bg-[#3a69a7] rounded-md overflow-hidden ${
                    item.status ? "bg-[#485363] cursor-not-allowed" : ""
                  }`}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  onClick={() => dispatch(showModal(buildDelete(item)))}
                  className="btn-delete w-6 sm:w-7 md:w-8 bg-[#ec1414] rounded-md overflow-hidden"
                >
                  <i className="bi bi-trash"></i>
                </button>
                <button
                  onClick={() => dispatch(toggleComplete(item.id))}
                  className={`btn-complete w-6 sm:w-7 md:w-8 bg-white rounded-md overflow-hidden text-white transition-all duration-300 
                  ${item.status ? "bg-[#15814f]" : ""}`}
                >
                  <i className="bi bi-check2"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
