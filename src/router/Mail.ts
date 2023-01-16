import express,{ Express } from "express";
import {Email} from "../Controllers/Mail";
const router = express.Router();

router.post('/',Email);

module.exports = router;
