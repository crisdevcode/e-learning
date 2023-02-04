import axios from 'axios';

import { setProducts, setLoading, setError } from '../slices/productsSlice.js';

export const getProducts = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axios.get('/api/products');
        dispatch(setProducts(data));
    } catch (error) {
        dispatch(
            setError(
                error.response && error.response.data.message 
                    ? error.message.response.data.message 
                    : error.message 
                    ? error.message 
                    : 'An unexpected error has ocurred. Please try again later.'
            )
        );
    }
};