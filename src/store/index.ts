import PurchaseSlice from "./slices/shop/purchase.slice";
import AuthSlice from "./slices/auth.slice";
import ListSlice from "./slices/todo/list.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import neonSlice from "./slices/neon.slice";
import shadowSlice from "./slices/shadow.slice";
import aboutMeSlice from "./slices/about-me.slice";
import ProjectsSlice from "./slices/projects.slice";
import headerSlice from "./slices/header.slice";
import aboutProjectSlice from "./slices/aboutProjects.slice";
import todoModalSlice from "./slices/todo/modal.slice";
import todoPopupSlice from "./slices/todo/popup.slice";
import shopPopupSlice from "./slices/shop/popup.slice";
import ProductsSlice from "./slices/shop/products.slice";
import CartSlice from "./slices/shop/cart.slice";
import ProfileSlice from "./slices/shop/profile.slice";
import ShopHeaderSlice from "./slices/shop/header.slice";
import profileSlice from "./slices/chat/profile.slice";
import { todoApi } from "./slices/shop/products.api";

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
  [todoApi.reducerPath]: todoApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
