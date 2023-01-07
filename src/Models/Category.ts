import {Schema,model,Model} from "mongoose"
import { ICategory } from "../types/CategoryType";


const CategorySchema:Schema<ICategory> = new Schema({
   name:{
    type:String,
    required:true
   },   
});

export const Category:Model<ICategory> = model("Category",CategorySchema);