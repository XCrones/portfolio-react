import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoDelete } from "./listSlice";

export interface ShowModal {
  title: string;
  item: TodoDelete;
}

interface State {
  title: string;
  isHide: boolean;
  item: TodoDelete;
}

const initialStateValue: State = {
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
    showModal: (state, action: PayloadAction<ShowModal>) => {
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
