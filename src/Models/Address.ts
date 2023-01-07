import {Schema,model,Model} from "mongoose"
import { IAddress } from "../types/AddressType"


const AddressSchema:Schema<IAddress> = new Schema({
   city :{
    type:String,
    required:true
   },
   number: {
    type:String,
    required:true
   },
   subcounty: {
    type:String,
    required:true
   },
   street: {
    type:String,
    required:true
   }
});

export const Address:Model<IAddress> = model("Address",AddressSchema);