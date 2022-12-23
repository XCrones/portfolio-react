import { createSlice } from "@reduxjs/toolkit";

interface IStateInitial {
  isHideProfile: boolean;
  isHideCart: boolean;
}

const initialStateValue: IStateInitial = {
  isHideProfile: true,
  isHideCart: true,
};

export const HeaderSlice = createSlice({
  name: "header",
  initialState: initialStateValue,
  reducers: {
    showCart(state) {
      state.isHideCart = !state.isHideCart;
      state.isHideProfile = true;
    },
    showProfile(state) {
      state.isHideCart = true;
      state.isHideProfile = !state.isHideProfile;
    },
  },
});

export const { showCart, showProfile } = HeaderSlice.actions;
export default HeaderSlice.reducer;
