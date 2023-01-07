import { INext, IReq, IRes } from "../common";
import { ApiError } from "../Errors/Errors";
import {Orders} from "../Models/Orders";
import { v4 as uuid_v4 } from "uuid";


class ProductController {
    public static CreateOrder = async (req: IReq, res: IRes, next: INext) => {
      try {
        const {amount, paymentMethod,products } = req.body;
        if (!amount || !paymentMethod || !products)
          return next(ApiError.NotFound("please input values"));
        const order = await Orders.create({
          orderId:uuid_v4(),
          userId:req.user.id,
          amount,
          paymentMethod,
          products,
        });
        await order.save();
      res.status(200).json(order);
      } catch (error) {
        next(ApiError.InternalError("create products error"));
      }
    };
  
    public static DeleteOrder = async (req: IReq, res: IRes, next: INext) => {
      try {
        await Orders.findByIdAndDelete(req.params.id);
        res.status(200).json("product is deleted");
      } catch (error) {
        next(ApiError.InternalError("error in deleting the product"));
      }
    };
  
    public static FindOrders = async (req: IReq, res: IRes, next: INext) => {
      try {
        const orders = await Orders.find();
        res.status(200).json(orders);
      } catch (error) {
        next(ApiError.InternalError("finding orders"));
      }
    };
  
    public static getOrder = async (req: IReq, res: IRes) => {
      try {
        const order = await Orders.findById(req.params.id);
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json({ error });
      }
    };
  
    public static updateOrders = async (req: IReq, res: IRes, next: INext) => {
      try {
        const { amount, paymentMethod,products} = req.body;
    
        await Orders.findOneAndUpdate(
          { _id: req.params.id },
          {
            amount,
            paymentMethod,
            products,
          }
        );
  
        res.status(200).json("order updated");
      } catch (error) {
        next(ApiError.InternalError("update orders"));
      }
    };
  }
  
  export const {CreateOrder,getOrder,DeleteOrder,updateOrders,FindOrders} = ProductController 