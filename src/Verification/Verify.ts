import jwt from "jsonwebtoken";
import {IReq,IRes,INext} from "../common/index";
import {JwtPayload} from "../Helpers/jwt";
import {secretKey} from "../config/index"
import { ApiError } from "../Errors/Errors";

class Verify {
    public static Verification = (req:IReq,res:IRes,next:INext) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) return next(ApiError.Required("authorization is required"));
        const token = authorization.split(' ')[1];
        if(!token) return next(ApiError.Required("token is required"))
        jwt.verify(token,secretKey,(err:any,user:any) => {
        if(err) return res.status(402).json("invalid token");
        req.user = user as JwtPayload
        })
    } catch (error) {
        next(ApiError.BadRequest("verification error"))
    }
    }
}

export const {Verification} = Verify;