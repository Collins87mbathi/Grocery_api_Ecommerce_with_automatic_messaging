import {ApiError} from "../Errors/Errors";
import {IReq,IRes,INext} from "../common/index";

export const ErrorHandler = (err:any,req:IReq,res:IRes,next:INext) => {
 if(err instanceof ApiError) {
  res.status(err.status).json(err.message);
  return;
 }
 res.status(500).json("internal server error");
};