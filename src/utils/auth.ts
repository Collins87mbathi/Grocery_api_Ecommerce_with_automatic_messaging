import { INext, IReq, IRes } from "../common";
 {/*@ts-ignore */}
import request from "request";
import dotenv from "dotenv"
dotenv.config();

 export const accessToken = (req:IReq, res:IRes, next:INext)=> {
    try{

        const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        {/*@ts-ignore */}
        const auth = new Buffer.from(`${consumerkey}:${consumersecret}`).toString('base64')

        request(
            {
                url: url,
                headers: {
                    "Authorization": "Basic " + auth
                }
            },
            (error:any, response:any, body:any) => {
                if (error) {
                    res.status(401).send({
                        "message": 'Something went wrong when trying to process your payment',
                        "error":error.message
                    })
                }
                else {
                    req.safaricom_access_token = JSON.parse(body).access_token
                    next()
                }
            }
        )
    }catch (error:any) {

        console.error("Access token error ", error)
        res.status(401).send({
            "message": 'Something went wrong when trying to process your payment',
            "error":error.message
        })
    }

}