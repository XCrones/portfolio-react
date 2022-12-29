import { RootState } from "./../../index";
import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  addToUnparcingCart,
  clearUnparcingCart,
  decremUnparcingCart,
  deleteItemUnparcingCart,
  incremUnparcingCart,
  IUnparsingItem,
  updateUnparsingCart,
} from "./cart.slice";
import { IProductItem } from "./products.slice";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc, Unsubscribe, updateDoc } from "firebase/firestore";
import { dataBase } from "../../../firebase";

interface ICartItem {
  id: number;
  count: number;
}

interface IProductsItem {
  id: number;
  count: number;
  price: number;
}

export interface IPurchaseItem {
  date: string;
  products: IProductsItem[];
}

export interface IProfile {
  cart: ICartItem[];
  purchases: IPurchaseItem[];
}

export interface IFieldsDb {
  cart: "cart";
  purchases: "purchases";
}

interface ILoad {
  cart: boolean;
  profile: boolean;
  addItem: boolean;
  incrementItem: boolean;
  decrementItem: boolean;
  deleteItem: boolean;
}

interface IStateInitial {
  profile: IProfile;
  fieldsDB: IFieldsDb;
  collection: "shop-users";
  isLoad: ILoad;
}

let profileRef: Unsubscribe | undefined = undefined;

const unsubProfile = () => {
  if (profileRef !== undefined) {
    profileRef();
  }
};

export const addToCart = createAsyncThunk<
  ICartItem,
  IProductItem,
  { dispatch: Dispatch; state: RootState; fullFilled: ICartItem }
>("profile/addToCart", async function (item, { dispatch, getState, fulfillWithValue }) {
  const parseItem: ICartItem = {
    id: item.id,
    count: 1,
  };

  const isAuth = getState().auth.isAuth;

  if (isAuth) {
    const collection = getState().shop.profile.collection;
    const uid = getState().auth.user.uid;

    const db = doc(dataBase, collection, uid);
    try {
      await updateDoc(db, {
        cart: arrayUnion(parseItem),
      });
    } catch (e) {
      await setDoc(db, {
        cart: [parseItem],
      });
    }
  }

  dispatch(addToUnparcingCart(item));

  return fulfillWithValue(parseItem);
});

export const updateProfile = createAsyncThunk<
  undefined,
  undefined,
  { dispatch: Dispatch; state: RootState; fullFilled: undefined }
>("profile/updateProfile", async function (_, { dispatch, getState, fulfillWithValue }) {
  const isAuth = getState().auth.isAuth;

  if (isAuth) {
    const cartProfile: ICartItem[] = getState().shop.profile.profile.cart;

    if (!!cartProfile) {
      const collection = getState().shop.profile.collection;
      const uid = getState().auth.user.uid;

      const db = doc(dataBase, collection, uid);

      try {
        await updateDoc(db, {
          cart: cartProfile,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return fulfillWithValue(undefined);
});

export const incrementItem = createAsyncThunk<ICartItem, number, { dispatch: Dispatch; state: RootState }>(
  "profile/incrementItem",
  async function (id, { dispatch, getState }) {
    const parseitem: ICartItem = {
      id: id,
      count: 1,
    };

    dispatch(incremUnparcingCart(id));
    return parseitem;
  }
);

export const decrementItem = createAsyncThunk<ICartItem, number, { dispatch: Dispatch; state: RootState }>(
  "profile/decrementItem",
  async function (id, { dispatch, getState }) {
    const parseitem: ICartItem = {
      id: id,
      count: 1,
    };

    dispatch(decremUnparcingCart(id));
    return parseitem;
  }
);

export const deleteItem = createAsyncThunk<ICartItem, number, { dispatch: Dispatch; state: RootState }>(
  "profile/deleteItem",
  async function (id, { dispatch, getState }) {
    const parseitem: ICartItem = {
      id: id,
      count: 1,
    };

    const isAuth = getState().auth.isAuth;

    if (isAuth) {
      const cartProfile = getState().shop.profile.profile.cart;
      const searchItem = cartProfile.find((value) => value.id === id);

      if (!!searchItem) {
        const collection = getState().shop.profile.collection;
        const uid = getState().auth.user.uid;

        const db = doc(dataBase, collection, uid);

        try {
          await updateDoc(db, {
            cart: arrayRemove(searchItem),
          });
        } catch (e) {
          console.log(e);
        }
      }
    }

    dispatch(deleteItemUnparcingCart(id));

    return parseitem;
  }
);
export const tryProfile = createAsyncThunk<
  IProfile,
  undefined,
  { dispatch: Dispatch; state: RootState; rejectValue: null; fullFilled: IProfile }
>("profile/tryProfile", async function (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) {
  const products = getState().shop.products.products;
  const isAuth = getState().auth.isAuth;
  const uid = getState().auth.user.uid;

  const searchItem = (id: number): IProductItem | undefined => products.find((item) => item.id === id);

  const makeCart = (arr: ICartItem[]): ICartItem[] => {
    const tempCart: ICartItem[] = [];
    const makingCart: IUnparsingItem[] = [];
    // eslint-disable-next-line array-callback-return
    arr.map((value) => {
      const searchProduct = searchItem(value.id);
      if (!!searchProduct) {
        tempCart.push({
          count: value.count,
          id: value.id,
        });
        makingCart.push({
          count: value.count,
          product: searchProduct,
        });
      }
    });
    dispatch(updateUnparsingCart(makingCart));
    return tempCart;
  };

  const tempProfile: IProfile = {
    cart: [],
    purchases: [],
  };

  unsubProfile();
  dispatch(clearProfile());
  dispatch(clearUnparcingCart());

  if (isAuth && !!uid) {
    const collection = getState().shop.profile.collection;
    const { cart, purchases } = getState().shop.profile.fieldsDB;

    const checkField = async () => {
      const db = doc(dataBase, collection, uid);
      const docSnap = await getDoc(db);
      const data = docSnap.data();

      if (!!data) {
        const hasKeyPurchases = Object.prototype.hasOwnProperty.call(data, "purchases");
        const hasKeyCart = Object.prototype.hasOwnProperty.call(data, "cart");

        if (!hasKeyCart) {
          try {
            await updateDoc(db, {
              cart: [],
            });
          } catch (err) {
            await setDoc(db, {
              cart: [],
            });
          }
        }

        if (!hasKeyPurchases) {
          try {
            await updateDoc(db, {
              purchases: [],
            });
          } catch (err) {
            await setDoc(db, {
              purchases: [],
            });
          }
        }
      } else {
        await setDoc(db, {
          cart: [],
          purchases: [],
        });
      }
    };

    const fetchData = async (): Promise<void> => {
      await checkField();
      return new Promise((resolve) => {
        profileRef = onSnapshot(doc(dataBase, collection, uid), (doc: any) => {
          if (!!doc.data()) {
            tempProfile.cart = makeCart(doc.data()[cart] || []);
            tempProfile.purchases = doc.data()[purchases] || [];

            dispatch(setProfile(tempProfile));
          }
          resolve();
        });
      });
    };

    await fetchData();
  } else {
    const searchData = localStorage.getItem("cart");
    if (!!searchData) {
      const parseData = JSON.parse(searchData);
      if (!!parseData && Array.isArray(parseData)) {
        tempProfile.cart = makeCart(parseData);
        dispatch(setProfile(tempProfile));
      }
    }
  }

  return fulfillWithValue(tempProfile);
});

export const profileSignOut = createAsyncThunk<
  undefined,
  undefined,
  { dispatch: Dispatch; state: RootState; rejectValue: undefined; fullFilled: undefined }
>("profile/profileSignOut", async function (_, { dispatch, getState, fulfillWithValue, rejectWithValue }) {
  const isAuth = getState().auth.isAuth;
  if (isAuth) {
    unsubProfile();
    return fulfillWithValue(undefined);
  }

  return rejectWithValue(undefined);
});

export const buy = createAsyncThunk<
  undefined,
  undefined,
  { state: RootState; rejectValue: undefined; fullFilled: undefined }
>("profile/buy", async function (_, { getState, fulfillWithValue }) {
  const isAuth = getState().auth.isAuth;
  const uid = getState().auth.user.uid;

  if (isAuth && !!uid) {
    const collection = getState().shop.profile.collection;
    const products = getState().shop.products.products;
    const cart = getState().shop.profile.profile.cart;

    const searchItem = (id: number): IProductItem | undefined => products.find((item) => item.id === id);

    if (!!cart) {
      const purchase: IPurchaseItem = {
        date: "",
        products: [],
      };
      const date = new Date().toISOString().split("T")[0] + "T" + new Date().toLocaleString().split(",")[1].trim();

      purchase.date = date;

      // eslint-disable-next-line array-callback-return
      cart.map((value) => {
        const searchProduct = searchItem(value.id);
        if (!!searchProduct) {
          purchase.products.push({
            count: value.count,
            id: value.id,
            price: searchProduct.price,
          });
        }
      });

      const db = doc(dataBase, collection, uid);

      try {
        await updateDoc(db, {
          cart: [],
          purchases: arrayUnion(purchase),
        });
      } catch (e) {
        await setDoc(db, {
          cart: [],
          purchases: [purchase],
        });
      }
    }
  }

  return fulfillWithValue(undefined);
});

const initialStateValue: IStateInitial = {
  collection: "shop-users",
  profile: {
    cart: [],
    purchases: [],
  },
  fieldsDB: {
    cart: "cart",
    purchases: "purchases",
  },
  isLoad: {
    cart: false,
    profile: false,
    addItem: false,
    decrementItem: false,
    deleteItem: false,
    incrementItem: false,
  },
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: initialStateValue,
  reducers: {
    clearProfile(state) {
      state.profile.cart = [];
      state.profile.purchases = [];
    },
    setProfile(state, action: PayloadAction<IProfile>) {
      state.profile = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoad.addItem = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoad.addItem = false;
        const searchItem = state.profile.cart.find((item) => item.id === action.payload.id);
        if (!searchItem) {
          state.profile.cart = [...state.profile.cart, action.payload];
          localStorage.setItem("cart", JSON.stringify(state.profile.cart));
        }
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoad.addItem = false;
      })

      .addCase(incrementItem.pending, (state) => {
        state.isLoad.incrementItem = true;
      })
      .addCase(incrementItem.fulfilled, (state, action) => {
        state.isLoad.incrementItem = false;
        const searchItem = state.profile.cart.find((item) => item.id === action.payload.id);
        if (!!searchItem) {
          searchItem.count += 1;
          localStorage.setItem("cart", JSON.stringify(state.profile.cart));
        }
      })
      .addCase(incrementItem.rejected, (state) => {
        state.isLoad.incrementItem = false;
      })

      .addCase(decrementItem.pending, (state) => {
        state.isLoad.decrementItem = true;
      })
      .addCase(decrementItem.fulfilled, (state, action) => {
        state.isLoad.decrementItem = false;
        const searchItem = state.profile.cart.find((item) => item.id === action.payload.id);
        if (!!searchItem && searchItem.count > 1) {
          searchItem.count -= 1;
          localStorage.setItem("cart", JSON.stringify(state.profile.cart));
        } else if (!!searchItem && searchItem.count === 1) {
          state.profile.cart = state.profile.cart.filter((value) => value.id !== action.payload.id);
          localStorage.setItem("cart", JSON.stringify(state.profile.cart));
        }
      })
      .addCase(decrementItem.rejected, (state) => {
        state.isLoad.decrementItem = false;
      })

      .addCase(deleteItem.pending, (state) => {
        state.isLoad.decrementItem = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoad.decrementItem = false;
        const searchItem = state.profile.cart.find((item) => item.id === action.payload.id);
        if (!!searchItem) {
          state.profile.cart = state.profile.cart.filter((value) => value.id !== action.payload.id);
          localStorage.setItem("cart", JSON.stringify(state.profile.cart));
        }
      })
      .addCase(deleteItem.rejected, (state) => {
        state.isLoad.decrementItem = false;
      })

      .addCase(profileSignOut.pending, (state) => {
        state.isLoad.profile = true;
        state.isLoad.cart = true;
      })
      .addCase(profileSignOut.fulfilled, (state) => {
        state.isLoad.profile = false;
        state.isLoad.cart = false;
        state.profile.cart = [];
        state.profile.purchases = [];
        localStorage.removeItem(state.fieldsDB.cart);
      })
      .addCase(profileSignOut.rejected, (state) => {
        state.isLoad.profile = false;
        state.isLoad.cart = false;
      })

      .addCase(tryProfile.pending, (state) => {
        state.isLoad.cart = true;
        state.isLoad.profile = true;
      })
      .addCase(tryProfile.fulfilled, (state, action) => {
        state.isLoad.cart = false;
        state.isLoad.profile = false;
      })
      .addCase(tryProfile.rejected, (state) => {
        state.isLoad.cart = false;
        state.isLoad.profile = false;
      })

      .addCase(buy.pending, (state) => {
        state.isLoad.cart = true;
        state.isLoad.profile = true;
      })
      .addCase(buy.fulfilled, (state) => {
        state.isLoad.cart = false;
        state.isLoad.profile = false;
      })
      .addCase(buy.rejected, (state) => {
        state.isLoad.cart = false;
        state.isLoad.profile = false;
      });
  },
});

export const { clearProfile, setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
