import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStateInitial {
  isHide: boolean;
}

const initialStateValue: IStateInitial = {
  isHide: false,
};

export const HeaderSlice = createSlice({
  name: "header",
  initialState: initialStateValue,
  reducers: {
    toggleHideHeader: (state) => {
      state.isHide = !state.isHide;
    },
    setHideHeader: (state, action: PayloadAction<boolean>) => {
      state.isHide = action.payload;
    },
  },
});

export const { toggleHideHeader, setHideHeader } = HeaderSlice.actions;
export default HeaderSlice.reducer;
