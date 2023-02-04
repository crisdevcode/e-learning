import axios from 'axios';

import { setProducts, setLoading, setError, setProduct } from '../slices/productsSlice.js';

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
                    : 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.'
            )
        );
    }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.'
      )
    );
  }
};