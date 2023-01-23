 {/*@ts-ignore */}
import request from "request";
import ngrok from "ngrok";
import {getTimestamp} from "../utils/timestamp";
import { Payment } from "../Models/Payment";
import { IReq, IRes } from "../common";
import {passkey, shortcode} from "../config/index";
import { Orders } from "../Models/Orders";
import { parse } from "path";

// @desc initiate stk push
// @method POST
// @route /stkPush
// @access public
export const initiateSTKPush = async(req:IReq, res:IRes) => {

    try{

        // const {amount, phone,orderId} = req.body;
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        const auth = "Bearer " + req.safaricom_access_token

        const timestamp = getTimestamp()
        //shortcode + passkey + timestamp
         {/*@ts-ignore */}
        const password = new Buffer.from(shortcode + passkey + timestamp).toString('base64')

        // create callback url
        const callback_url ="https://perezgrabs.azurewebsites.net/api"
        console.log("callback ",callback_url)
        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode":shortcode,
                    "Password": password,
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount":req.body.amount,
                    "PartyA":req.body.phone,
                    "PartyB": shortcode,
                    "PhoneNumber":req.body.phone,
                    "CallBackURL": `${callback_url}/payment/${req.body.orderId}`,
                    "AccountReference": "Perez Grocery Shop",
                    "TransactionDesc": "Online Payment"
                }
            },
            function (e:any, response:any, body:any) {
                if (e) {
                    console.error(e)
                    res.status(502).send({
                        message:"Error with the stk push",
                        error : e
                    })
                } else {
                    res.status(200).json(body)
                }
            }
        )
    }catch (e) {
        console.error("Error while trying to create LipaNaMpesa details",e)
        res.status(503).send({
            message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: e
        })
    }
}


// @desc callback route Safaricom will post transaction status
// @method POST
// @route /stkPushCallback/:Order_ID
// @access public
 export const stkPushCallback = async(req:IReq, res:IRes) => {
    try{

    //    order id
        const {orderId} = req.params

        //callback details

        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
                 }   = req.body.Body.stkCallback
   
    //     get the meta data from the meta
        const meta = Object.values(await CallbackMetadata.Item)
         {/*@ts-ignore */}
        const PhoneNumber = meta.find(o => o.Name === 'PhoneNumber').Value.toString()
        {/*@ts-ignore */}
        const amount = meta.find(o => o.Name === 'Amount').Value.toString()
         {/*@ts-ignore */}
        const MpesaReceiptNumber = meta.find(o => o.Name === 'MpesaReceiptNumber').Value.toString()
          {/*@ts-ignore */}
        const TransactionDate = meta.find(o => o.Name === 'TransactionDate').Value.toString()
        
        //saving the transaction to the database
        const onlinePayment = new Payment({
            orderId,
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            PhoneNumber,
            amount, 
            MpesaReceiptNumber,
            TransactionDate 
        });
      await onlinePayment.save();
      await Orders.updateOne({  orderId:orderId }, { isPaid: true})
        res.json(true)
    }catch (e:any) {
        console.error("Error while trying to update LipaNaMpesa details from the callback",e)
        res.status(503).send({
            message:"Something went wrong with the callback",
            error : e.message
        })
    }
}

// @desc Check from safaricom servers the status of a transaction
// @method GET
// @route /confirmPayment/:CheckoutRequestID
// @access public
 export const confirmPayment = async(req:IReq, res:IRes) => {
    try{


        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        const auth = "Bearer " + req.safaricom_access_token

        const timestamp = getTimestamp()
        //shortcode + passkey + timestamp
         {/*@ts-ignore */}
        const password = new Buffer.from(shortcode + passkey + timestamp).toString('base64')


        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode": parseInt(shortcode),
                    "Password": password,
                    "Timestamp": timestamp,
                    "CheckoutRequestID": req.params.CheckoutRequestID,

                }
            },
            function (error: any, response: any, body: any) {
                if (error) {
                    console.log(error)
                    res.status(503).send({
                        message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
                        error : error
                    })
                } else {
                    res.status(200).json(body)
                }
            }
        )
    }catch (e) {
        console.error("Error while trying to create LipaNaMpesa details",e)
        res.status(503).send({
            message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error : e
        })
    }
}

