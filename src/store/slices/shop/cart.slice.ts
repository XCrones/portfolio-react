import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductItem } from "./products.slice";

export interface IUnparsingItem {
  product: IProductItem;
  count: number;
}

interface IStateInitial {
  unparsingCart: IUnparsingItem[];
  totalPrice: number;
}

const initialStateValue: IStateInitial = {
  unparsingCart: [],
  totalPrice: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: initialStateValue,
  reducers: {
    updateUnparsingCart(state, action: PayloadAction<IUnparsingItem[]>) {
      state.unparsingCart = action.payload;
    },
    addToUnparcingCart(state, action: PayloadAction<IProductItem>) {
      const searchItem = state.unparsingCart.find((item) => item.product.id === action.payload.id);

      if (searchItem === undefined) {
        const tempitem: IUnparsingItem = {
          product: Object.assign({}, action.payload),
          count: 1,
        };
        state.unparsingCart = [...state.unparsingCart, tempitem];
      }
    },
    incremUnparcingCart(state, action: PayloadAction<number>) {
      const result = state.unparsingCart.find((item) => item.product.id === action.payload);

      if (!!result) {
        result.count += 1;
      }
    },
    decremUnparcingCart(state, action: PayloadAction<number>) {
      const result = state.unparsingCart.find((item) => item.product.id === action.payload);

      if (!!result) {
        if (result.count < 2) {
          state.unparsingCart = state.unparsingCart.filter((item) => item.product.id !== action.payload);
        } else {
          result.count -= 1;
        }
      }
    },
    deleteItemUnparcingCart(state, action: PayloadAction<number>) {
      state.unparsingCart = state.unparsingCart.filter((item) => item.product.id !== action.payload);
    },
    clearUnparcingCart(state) {
      state.unparsingCart = [];
    },
  },
  extraReducers: (builder) => {},
});

export const {
  incremUnparcingCart,
  deleteItemUnparcingCart,
  decremUnparcingCart,
  addToUnparcingCart,
  clearUnparcingCart,
  updateUnparsingCart,
} = CartSlice.actions;
export default CartSlice.reducer;

export const slicePrice = (price: number) => {
  const value = +price;
  const val = (value / 1).toFixed(2).replace(",", ".");
  return `USD ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const sliceString = (value: string, maxLength: number) => `${value.slice(0, maxLength)}...`;
