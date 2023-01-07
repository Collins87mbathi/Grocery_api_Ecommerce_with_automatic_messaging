import {Document} from "mongoose"

export interface IProduct extends Document {
    title:string,
    category:string,
    img:Object,
    price:string
}