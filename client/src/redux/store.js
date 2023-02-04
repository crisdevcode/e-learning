import { combineReducers, configureStore } from '@reduxjs/toolkit';
import products from './slices/productsSlice.js';
import cart from './slices/cartSlice.js';

const reducer = combineReducers({
    products,
    cart
});

export default configureStore({
    reducer,
});