import express from "express";
import { CreateOrder, DeleteOrder, FindOrders, getOrder, updateOrders } from "../Controllers/Order";
import {Required} from "../Verification/Verify";

const router = express.Router();

router.post('/',Required,CreateOrder);
router.get('/',FindOrders);
router.delete('/:id',DeleteOrder);
router.put('/:id',updateOrders);
router.get(':/id',getOrder);


module.exports = router;