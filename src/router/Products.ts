import express from "express";
import { CreateProduct, DeleteProduct, FindProducts, getProduct, updateProducts,FindProductAll } from "../Controllers/Products";

const router = express.Router();

router.post('/',CreateProduct);
router.get('/',FindProducts);
router.delete('/:id',DeleteProduct);
router.put('/:id',updateProducts);
router.get(':/id',getProduct);
router.get('/all',FindProductAll);

module.exports = router;