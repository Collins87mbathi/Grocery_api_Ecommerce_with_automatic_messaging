import express,{ Express } from "express";
const router = express.Router();
import {initiateSTKPush,stkPushCallback,confirmPayment} from "../Controllers/Payment";
import {accessToken} from "../utils/auth";

router.post('/stkPush',accessToken,initiateSTKPush);
router.post('/payment/:orderId',stkPushCallback);
router.post('/confirmPayment/:CheckoutRequestID',accessToken,confirmPayment);


module.exports = router;