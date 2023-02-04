import express from 'express';
import ProductModel from '../models/ProductModel.js';
const productRoutes = express.Router();

const getProducts = async (req, res) => {
    const products = await ProductModel.find({});
    res.json(products);
}

const getProduct = async (req, res) => {
    const product = await ProductModel.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado.');
    }
}

productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);

export default productRoutes;