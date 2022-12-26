import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoDelete } from "./list.slice";

export interface IShowModal {
  title: string;
  item: ITodoDelete;
}

interface IStateInitial {
  title: string;
  isHide: boolean;
  item: ITodoDelete;
}

const initialStateValue: IStateInitial = {
  isHide: true,
  title: "",
  item: {
    id: -1,
    isDeleteAll: false,
  },
};

export const ModalSlice = createSlice({
  name: "todo",
  initialState: initialStateValue,
  reducers: {
    showModal: (state, action: PayloadAction<IShowModal>) => {
      state.title = action.payload.title;
      state.item.id = action.payload.item.id;
      state.item.isDeleteAll = action.payload.item.isDeleteAll;
      state.isHide = false;
    },
    closeModal: (state) => {
      state.title = "";
      state.isHide = true;
    },
  },
});

export const { showModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
