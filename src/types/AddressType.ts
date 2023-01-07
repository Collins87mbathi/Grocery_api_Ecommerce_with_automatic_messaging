import {Document} from "mongoose";

export interface IAddress extends Document {
    city:string,
    number:string,
    subcounty:string,
    street:string
}