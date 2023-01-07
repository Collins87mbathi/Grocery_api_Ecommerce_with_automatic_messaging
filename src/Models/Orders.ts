import {Schema,Model,model} from "mongoose";
import { IOrder } from "../types/OrderType";

const OrderSchema:Schema<IOrder> = new Schema({
    orderId: {
        type:String,
        required:true
     },
     userId: {
        type:String,
        required:true
     },
     date: {
      type:Date,
      default:new Date()
     },
     amount: {
      type:String,
      required:true
     },
     paymentMethod: {
    type:String,
    required:true
    },
    isDelivered: {
    type:Boolean,
    default:false
    },
    isPaid: {
    type:Boolean,
    default:false
    },
    products:[{
        type:Array
       }]
});


export const Orders:Model<IOrder> = model("Orders",OrderSchema);