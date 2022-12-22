import { createSlice } from "@reduxjs/toolkit";

interface State {
  isHide: boolean;
}

const initialStateValue: State = {
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
