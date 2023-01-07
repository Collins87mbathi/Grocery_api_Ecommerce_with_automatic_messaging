import express from "express";
import { CreateCategory,FindCategory} from "../Controllers/Category";
import {Required} from "../Verification/Verify";

const router = express.Router();

router.post('/',Required,CreateCategory);
router.get('/',FindCategory);

module.exports = router;