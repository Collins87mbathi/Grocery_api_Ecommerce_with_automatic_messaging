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
      type:String,
      required:true
     },
     price: {
      type:Number,
      required:true
     },
     size: {
      type:String,
      required:true
     }
});


export const Products:Model<IProduct> = model("Products",ProductSchema);