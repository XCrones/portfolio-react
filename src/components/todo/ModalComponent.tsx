import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TodoDelete, todoDelete } from "../../store/slices/todo/listSlice";
import { closeModal } from "../../store/slices/todo/modalSlice";

const ModalComponent = () => {
  const title = useAppSelector((state) => state.todo.modal.title);
  const isDeleteAll = useAppSelector((state) => state.todo.modal.item.isDeleteAll);
  const id = useAppSelector((state) => state.todo.modal.item.id);

  const dispatch = useAppDispatch();

  const isDelete = (confirm: boolean) => {
    if (confirm) {
      const deleteItem: TodoDelete = {
        isDeleteAll: isDeleteAll,
        id: id,
      };
      dispatch(todoDelete(deleteItem));
    }

    dispatch(closeModal());
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-2/4 lg:w-1/3 h-[35%] bg-[rgba(31,39,56,0.95)] rounded-2xl">
      <div className="h-full w-full flex flex-col justify-between p-2">
        <div className="text-center capitalize text-lg">подтверждение</div>
        <div className="text-center underline underline-offset-4">{title}</div>
        <div className="flex flex-row justify-around gap-x-2 items-center">
          <button
            onClick={() => isDelete(true)}
            className="btn-delete flex flex-row gap-x-2 items-center justify-between bg-green-700 p-2 hover:bg-green-500 rounded-md transition-all duration-300 w-1/2"
          >
            <div className="capitalize text-xs sm:text-sm">удалить</div>
            <div className="">
              <i className="bi bi-check-square text-sm sm:text-xl"></i>
            </div>
          </button>
          <button
            onClick={() => isDelete(false)}
            className="btn-cancel flex flex-row gap-x-2 items-center justify-between bg-red-700 hover:bg-red-500 p-2 rounded-md transition-all duration-300 w-1/2"
          >
            <div className="capitalize text-xs sm:text-sm">отмена</div>
            <div className="">
              <i className="bi bi-x-square text-sm sm:text-xl"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
