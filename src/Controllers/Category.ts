import { INext, IReq, IRes } from "../common";
import { ApiError } from "../Errors/Errors";
import { Category } from "../Models/Category";



class CategoryController {
    public static CreateCategory = async (req: IReq, res: IRes, next: INext) => {
        try {
          const {name } = req.body;
          if ( !name)
            return next(ApiError.NotFound("please input values"));
          const category = await Category.create({
            name,
          });
          await category.save();
        res.status(200).json(category);
        } catch (error) {
          next(ApiError.InternalError("create category error"));
        }
      };

      public static FindCategory = async (req: IReq, res: IRes, next: INext) => {
        try {
          const category = await Category.find();
          res.status(200).json(category);
        } catch (error) {
          next(ApiError.InternalError("finding category"));
        }
      };
}


export const {CreateCategory,FindCategory} =  CategoryController;