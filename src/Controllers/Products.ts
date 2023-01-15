import { nextTick } from "process";
import { INext, IReq, IRes } from "../common";
import { ApiError } from "../Errors/Errors";
import { Products } from "../Models/Products";

class APIfeatures {
  query: any;
  queryString: any;
  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

class ProductController {
  public static CreateProduct = async (req: IReq, res: IRes, next: INext) => {
    try {
      const { title, category,size, img, price } = req.body;
      if (!title || !category || !price)
        return next(ApiError.NotFound("please input values"));

      if (!img) return next(ApiError.NotFound("No images uploaded"));
      const product = await Products.create({
        title,
        category,
        img,
        price,
        size,
      });
      await product.save();
    res.status(200).json(product);
    } catch (error) {
      next(ApiError.InternalError("create products error"));
    }
  };

  public static DeleteProduct = async (req: IReq, res: IRes, next: INext) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json("product is deleted");
    } catch (error) {
      next(ApiError.InternalError("error in deleting the product"));
    }
  };

  public static FindProducts = async (req: IReq, res: IRes, next: INext) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      res.status(200).json(products);
    } catch (error) {
      next(ApiError.InternalError("finding products"));
    }
  };

  public static FindProductAll = async (req: IReq, res: IRes, next: INext) => {
    try {
      const products = await Products.find({
        category:req.query.category,
        title:req.query.title
      });
      res.status(200).json(products);
    } catch (error) {
      next(ApiError.InternalError("finding products"));
    }
  };

  public static getProduct = async (req: IReq, res: IRes) => {
    try {
      const product = await Products.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  public static updateProducts = async (req: IReq, res: IRes, next: INext) => {
    try {
      const { title, price, image, category } = req.body;
      if (!image) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          category,
        }
      );

      res.status(200).json("product updated");
    } catch (error) {
      next(ApiError.InternalError("update products"));
    }
  };
}

export const {CreateProduct,getProduct,DeleteProduct,updateProducts,FindProducts,FindProductAll} = ProductController 