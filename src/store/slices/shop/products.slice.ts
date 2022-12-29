import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import { URL_SHOP } from "../../../environment";

export interface IFilterBy {
  price: string;
  rate: string;
  amount: string;
}

export interface IProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const filterBy: IFilterBy = {
  price: "цене",
  rate: "рейтингу",
  amount: "остатку",
};

interface IFilterItem {
  filterItems: string[];
  currFilter: string;
  stateCurrFilter: boolean;
}

interface IStateInitial {
  filter: IFilterItem;
  search: string;
  products: IProductItem[];
  isLoad: boolean;
}

export const getAll = createAsyncThunk<IProductItem[], undefined, { fullFilled: IProductItem[]; rejectValue: [] }>(
  "products/getAll",
  async function (_, { fulfillWithValue, rejectWithValue }) {
    try {
      const result = await axios.get(`${URL_SHOP}/products`);
      return fulfillWithValue(result.data as IProductItem[]);
    } catch (e) {
      return rejectWithValue([]);
    }
  }
);

const initialStateValue: IStateInitial = {
  filter: {
    filterItems: [filterBy.price, filterBy.rate, filterBy.amount],
    currFilter: filterBy.price,
    stateCurrFilter: true,
  },
  search: "",
  products: [],
  isLoad: false,
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState: initialStateValue,
  reducers: {
    toggleStateFilter(state) {
      state.filter.stateCurrFilter = !state.filter.stateCurrFilter;
    },
    setCurrFilter(state, action: PayloadAction<string>) {
      state.filter.currFilter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload.trim();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoad = false;
        state.products = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoad = false;
      });
  },
});

export const { toggleStateFilter, setCurrFilter, setSearch } = ProductsSlice.actions;
export default ProductsSlice.reducer;

export const calcRate = (rate: number) => (rate * 100) / 5;
export const calcCount = (count: number): number => (count * 100) / 1000;
