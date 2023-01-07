import {Document} from "mongoose";
import { IAddress } from "./AddressType";
import { IOrder } from "./OrderType";

export interface IUser extends Document {
    fullname:string,
    email:string,
    password:string,
    address:Array<IAddress>,
    _doc:any,
    isAdmin:boolean,
    orders:Array<IOrder>,
    matchPassword(password: string): boolean | PromiseLike<boolean>
}