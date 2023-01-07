import express from "express";
import { CreateAddress } from "../Controllers/Address";
import {Required} from "../Verification/Verify";

const router = express.Router();

router.post('/',Required,CreateAddress);

module.exports = router;