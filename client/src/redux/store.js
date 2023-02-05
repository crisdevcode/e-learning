import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/productsSlice.js";
import cart from "./slices/cartSlice.js";
import user from "./slices/userSlice.js";

const reducer = combineReducers({
  products,
  cart,
  user,
});

export default configureStore({
  reducer,
});
