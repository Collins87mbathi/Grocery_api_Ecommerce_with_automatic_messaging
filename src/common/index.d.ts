import {Request,Response,NextFunction} from "express";

export interface IReq extends Request {
      [key: string]: any
}

export interface IRes extends Response {
     [key: string]: any
}

export interface INext extends NextFunction {
    [key: string]: any
}
