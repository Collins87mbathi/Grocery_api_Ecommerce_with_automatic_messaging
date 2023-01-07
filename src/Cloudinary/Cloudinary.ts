import {cloud_name,api_key,api_secret} from "../config/index";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

// import { ICloudinary, ICloudinaryResponse } from "../../types/Cloudinary";

export class Cloudinary  {
  constructor() {
    cloudinary.config({
      cloud_name: cloud_name,
      api_key: api_key,
      api_secret: api_secret,
    });
  }
  
  uploadImage = async (imageToUpload: string) => {
    try {
        const cloudinaryImageUploadResponseData = await cloudinary.uploader.upload(
          imageToUpload,
          {
            public_id: cloud_name,
          }
        );
  
        const { url } = cloudinaryImageUploadResponseData;
  
        if (!url) {
          unlinkSync(imageToUpload);
          return {
            isSuccess: false,
            message:
              "Couldn't upload your image at the moment. Please try again later.",
            statusCode: 400,
          };
        }
  
        unlinkSync(imageToUpload);
        return {
          isSuccess: true,
          message: "Successfully uploaded image.",
          statusCode: 200,
          imageURL: url,
        };
      } catch (error) {
        unlinkSync(imageToUpload);
        return {
          isSuccess: false,
          message: error,
          statusCode: 500,
        };
        
      }
  
  }
}