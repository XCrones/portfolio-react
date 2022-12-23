import { createSlice } from "@reduxjs/toolkit";

interface IStateInitial {
  isHide: boolean;
}

const initialStateValue: IStateInitial = {
  isHide: true,
};

export const PopupSlice = createSlice({
  name: "todo",
  initialState: initialStateValue,
  reducers: {
    toggleHideModalTodo: (state) => {
      state.isHide = !state.isHide;
    },
  },
});

export const { toggleHideModalTodo } = PopupSlice.actions;
export default PopupSlice.reducer;
