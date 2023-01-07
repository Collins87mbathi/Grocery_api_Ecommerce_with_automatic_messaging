import {Schema,Model,model} from "mongoose";
import { IProduct } from "../types/ProductType";

const ProductSchema:Schema<IProduct> = new Schema({
    title: {
        type:String,
        required:true
     },
     category: {
        type:String,
        required:true
     },
     img: {
      type:Object
     },
     price: {
      type:String,
      required:true
     }
});


export const Products:Model<IProduct> = model("Products",ProductSchema);