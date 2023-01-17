import {Document} from "mongoose";
import { IProduct } from "./ProductType";

export interface IOrder extends Document {
    orderId:string,
    userId:string,
    date:Date,
    amount:string,
    paymentMethod:string,
    isDelivered:Boolean,
    isPaid:Boolean,
    isComplete:Boolean,
    products:Array<IProduct>
}