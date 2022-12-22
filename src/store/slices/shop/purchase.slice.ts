import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { ProductItem } from "./products.slice";
import { PurchaseItem } from "./profile.slice";

interface SelectPurchaseItem {
  count: number;
  price: number;
  title: string;
  image: string;
}

export interface SelectPurchase {
  date: string;
  totalPrice: number;
  items: SelectPurchaseItem[];
}

interface State {
  purchase: SelectPurchase;
  isHide: boolean;
}

const initialStateValue: State = {
  isHide: true,
  purchase: {
    date: "",
    totalPrice: 0,
    items: [],
  },
};

export const openPurchase = createAsyncThunk<SelectPurchase, PurchaseItem, { dispatch: Dispatch; state: RootState }>(
  "cart/openPurchase",
  async function (item, { dispatch, getState }) {
    const products = getState().shop.products.products;
    const searchItem = (id: number): ProductItem | undefined => products.find((item) => item.id === id);

    const totalPrice = (arr: SelectPurchaseItem[]): number => {
      if (arr.length > 0) {
        const sums = arr.map((item) => item.price * item.count);
        const result = sums.reduce(function (sum, current) {
          return sum + current;
        }, 0);
        return result;
      }

      return 0;
    };

    const makingPurchase: SelectPurchase = {
      date: item.date,
      totalPrice: 0,
      items: [],
    };

    // eslint-disable-next-line array-callback-return
    item.products.map((item) => {
      const searchProduct = searchItem(item.id);

      if (!!searchProduct) {
        makingPurchase.items.push({
          count: item.count,
          price: item.price,
          image: searchProduct.image,
          title: searchProduct.title,
        });
      }
    });

    makingPurchase.totalPrice = totalPrice(makingPurchase.items);

    return makingPurchase;
  }
);

export const PurchaseSlice = createSlice({
  name: "purchase",
  initialState: initialStateValue,
  reducers: {
    closePurchase(state) {
      state.isHide = !state.isHide;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openPurchase.fulfilled, (state, action) => {
      state.purchase = { ...action.payload };
      state.isHide = false;
    });
  },
});

export const { closePurchase } = PurchaseSlice.actions;
export default PurchaseSlice.reducer;
