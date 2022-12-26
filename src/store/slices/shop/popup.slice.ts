import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductItem as IProductItem } from "./products.slice";

const emptyItem: IProductItem = {
  id: -1,
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  rating: { rate: 0, count: 0 },
};

interface IStateInitial {
  isHide: boolean;
  item: IProductItem;
}

const initialStateValue: IStateInitial = {
  isHide: true,
  item: {
    id: -1,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  },
};

export const PopupSlice = createSlice({
  name: "shop",
  initialState: initialStateValue,
  reducers: {
    showPoup(state, action: PayloadAction<IProductItem>) {
      state.item = { ...action.payload };
      state.isHide = false;
    },
    closePopup: (state) => {
      state.isHide = true;
      state.item = { ...emptyItem };
    },
  },
});

export const { closePopup, showPoup } = PopupSlice.actions;
export default PopupSlice.reducer;
