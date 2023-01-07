import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { secretKey } from "../config";
import { INext, IReq, IRes } from "../common";
import { ApiError } from "../Errors/Errors";
import { JwtPayload } from "../Helpers/jwt";
dotenv.config();

class Auth {
    public static Required = async (req:IReq,res:IRes,next:INext) => {
    try {
     const authorization = req.headers.authorization;
     if(!authorization) return next(ApiError.NotFound("authorization is required"));
     const token = authorization.split(' ')[1];
     if(!token) return next(ApiError.NotFound("token is required"));
     jwt.verify(token,secretKey, (err:any, user:any)=>{
     if(err) return res.status(402).json("invalid token");
     req.user = user as JwtPayload
     next();
     })
    } catch (error) {
        return next(ApiError.InternalError("internal server error"));
    } 
    }
};


export const { Required } = Auth;