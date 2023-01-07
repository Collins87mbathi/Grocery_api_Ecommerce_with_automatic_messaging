import {Login,Register} from "../Controllers/User";
import express from "express";
const router = express.Router();

router.post('/register',Register);
router.post('/login',Login);


module.exports = router;
