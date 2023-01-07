import {Login,Register,GetUser} from "../Controllers/User";
import express from "express";
import { Required } from "../Verification/Verify";
const router = express.Router();

router.post('/register',Register);
router.post('/login',Login);
router.get('/',GetUser);


module.exports = router;
