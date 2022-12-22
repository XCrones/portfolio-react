import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "./products.slice";

const emptyItem: ProductItem = {
  id: -1,
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  rating: { rate: 0, count: 0 },
};

interface State {
  isHide: boolean;
  item: ProductItem;
}

const initialStateValue: State = {
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
    showPoup(state, action: PayloadAction<ProductItem>) {
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
