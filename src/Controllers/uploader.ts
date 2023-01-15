import {IReq,IRes,INext} from "../common/index";
import {cloudinaryInstance} from "../Cloudinary/index";

export const Uploader = async(req:IReq,res:IRes,next:INext) => {
 try {

 } catch (error) {

 }


  const localFilePath = req.file?.path || "";

  const { isSuccess, message, statusCode, imageURL } =
    await cloudinaryInstance.uploadImage(localFilePath);

  return res.status(statusCode).json({
    isSuccess,
    message,
    imageURL,
  })
}