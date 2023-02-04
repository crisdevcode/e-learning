import { combineReducers, configureStore } from '@reduxjs/toolkit';
import products from './slices/productsSlice.js'

const reducer = combineReducers({
    products,
});

export default configureStore({
    reducer,
});