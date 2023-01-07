import express from "express";
import { CreateProduct, DeleteProduct, FindProducts, getProduct, updateProducts } from "../Controllers/Products";

const router = express.Router();

router.post('/',CreateProduct);
router.get('/',FindProducts);
router.delete('/:id',DeleteProduct);
router.put('/:id',updateProducts);
router.get(':/id',getProduct);


module.exports = router;