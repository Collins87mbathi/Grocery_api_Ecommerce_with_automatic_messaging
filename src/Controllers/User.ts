import { INext, IReq, IRes } from "../common";
import { ApiError } from "../Errors/Errors";
import { User } from "../Models/User";
import { IUser } from "../types/UserType";
import { EmailValidator } from "../validators/email";
import jwt from "jsonwebtoken";
import { secretKey } from "../config";

class UserController {
  public static Register = async (req: IReq, res: IRes, next: INext) => {
    try {
      const { fullname, email, password } = req.body;
      const user: IUser | null = await User.findOne({ email: email });
      if (user) return next(ApiError.NotFound("This user already exist"));
      if (!fullname || !email || !password)
        return next(ApiError.Required("please input values"));
      if (!EmailValidator(email))
        return next(ApiError.BadRequest("enter a valid email"));
      const savedUser: IUser = await User.create({
        fullname,
        email,
        password,
      });
      await savedUser.save();
      res.status(200).json("user created");
    } catch (error) {
      console.log(error);
    }
  };

  public static Login = async (req: IReq, res: IRes, next: INext) => {
    try {
      if (!req.body.email || !req.body.password)
        return next(ApiError.NotFound("please input values"));
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(ApiError.NotFound("This user does not exist"));
      const isMatch: boolean = await user.matchPassword(req.body.password);
      if (!isMatch) return res.status(404).json("please input password");
      const token = jwt.sign({ id: user._id, email: user.email }, secretKey);
      const { password, ...otherDetails } = user._doc;
      res.status(200).json({ user: { ...otherDetails, token } });
    } catch (error) {
      console.log(error);
    }
  };

  public static GetUser = async (req:IReq,res:IRes,next:INext) => {
    try {
        const users = await User.find();  
        res.status(200).json(users);
    } catch (error) {
       next(ApiError.InternalError("error")); 
    }
  }

  public static DeleteUser = async (req:IReq,res:IRes,next:INext) => {
    try {
        await User.findByIdAndDelete(req.params.id);  
        res.status(200).json("user is deleted");
    } catch (error) {
       next(ApiError.InternalError("error")); 
    }
  }
}

export const { Login, Register,DeleteUser,GetUser } = UserController;
