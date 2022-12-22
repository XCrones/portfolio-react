import PurchaseSlice from "./slices/shop/purchase.slice";
import AuthSlice from "./slices/auth.slice";
import ListSlice from "./slices/todo/listSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import neonSlice from "./slices/neonSlice";
import shadowSlice from "./slices/shadowSlice";
import aboutMeSlice from "./slices/aboutMeSlice";
import ProjectsSlice from "./slices/projectsSlice";
import headerSlice from "./slices/headerSlice";
import aboutProjectSlice from "./slices/aboutProjectSlice";
import todoModalSlice from "./slices/todo/modalSlice";
import todoPopupSlice from "./slices/todo/popupSlice";
import shopPopupSlice from "./slices/shop/popupSlice";
import ProductsSlice from "./slices/shop/products.slice";
import CartSlice from "./slices/shop/cart.slice";
import ProfileSlice from "./slices/shop/profile.slice";
import ShopHeaderSlice from "./slices/shop/header.slice";
import profileSlice from "./slices/chat/profile.slice";

const shopReducer = combineReducers({
  popup: shopPopupSlice,
  products: ProductsSlice,
  cart: CartSlice,
  profile: ProfileSlice,
  header: ShopHeaderSlice,
  purchase: PurchaseSlice,
});

const todoReducer = combineReducers({
  modal: todoModalSlice,
  popup: todoPopupSlice,
  list: ListSlice,
});

const chatReducer = combineReducers({
  profile: profileSlice,
});

const appCommonReducer = combineReducers({
  neon: neonSlice,
  shadow: shadowSlice,
  projects: ProjectsSlice,
  aboutProject: aboutProjectSlice,
});

const rootReducer = combineReducers({
  appCommon: appCommonReducer,
  aboutMe: aboutMeSlice,
  header: headerSlice,
  auth: AuthSlice,
  todo: todoReducer,
  shop: shopReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
