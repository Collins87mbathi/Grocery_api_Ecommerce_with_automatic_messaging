import { INext, IReq, IRes } from "../common";
import { ApiError } from "../Errors/Errors";
import { Address } from "../Models/Address";
import { User } from "../Models/User";



class AddressController {
    public static CreateAddress = async (req: IReq, res: IRes, next: INext) => {
        try {
          const {city,number,subcounty,street } = req.body;
          if (!city || !number || !subcounty || !street)
            return next(ApiError.NotFound("please input values"));
          const address = await Address.create({
            city,
            number,
            subcounty,
            street,
          });
          await address.save();
        try {
          await User.findByIdAndUpdate(req.user.id, {
            $push: { address:address },
          });  
        } catch (error) {
          next(ApiError.BadRequest("push of address to user error"))
        }
        res.status(200).json(address);
        } catch (error) {
          next(ApiError.InternalError("create address error"));
        }
      };
}


export const {CreateAddress} =  AddressController;