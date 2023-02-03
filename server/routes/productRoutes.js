import express from 'express';
import ProductModel from '../models/ProductModel.js';
const productRoutes = express.Router();

const getProducts = async (req, res) => {
    const products = await ProductModel.find({});
    res.json(products);
}

productRoutes.route('/').get(getProducts);

export default productRoutes;