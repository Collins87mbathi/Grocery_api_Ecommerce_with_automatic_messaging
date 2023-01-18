import {Document} from "mongoose";

export interface IPayment extends Document {
    orderId:string,
    MerchantRequestID:string,
    amount:string,
    CheckoutRequestID:string,
    ResultCode:number,
    ResultDesc:string,
    PhoneNumber:number,
    MpesaReceiptNumber:string,
    TransactionDate:Date
   
}