import {Schema,Model,model} from "mongoose";
import {IPayment} from "../types/PaymentType";

const PaymentSchema:Schema<IPayment> = new Schema({
    orderId : {
        type : String,
    },
    PhoneNumber:{
     type: Number
    },
    MerchantRequestID: {
        type : String,
    },
    CheckoutRequestID: {
        type : String,
    },
    ResultCode: {
        type : Number,
    },
    ResultDesc: {
        type : String,
    },
    amount: {
        type : String,
    },
    MpesaReceiptNumber: {
        type : String,
    },
    TransactionDate: {
        type : Date
    }
});

export const Payment:Model<IPayment> = model("Payment",PaymentSchema);