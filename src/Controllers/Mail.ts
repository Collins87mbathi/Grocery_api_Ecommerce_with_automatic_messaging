import { INext, IReq, IRes } from "../common";
 {/*@ts-ignore */}
import nodemailer from "nodemailer";
import {user,pass} from "../config/index";





class EmailController {
 public static Email = async (req:IReq,res:IRes,next:INext) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
         user:user,
         pass:pass
        }
    });
     const mailOptions = {
        from: `${user}`,
        to:`${req.body.email}`,
        subject: `Your order`,
        html: `
        <div style="max-width: 700px; margin:auto; padding: 50px 20px; font-size: 110%;">
        <p>Hello there, Thanks for shopping with us your order id is:${req.body.orderId} will be delivered in a few, thanks for your patience.</p>
         </div>`
     }

    await transporter.sendMail(mailOptions, (error:any, info:any) => {
      if(error) {
        console.log(error);
        res.status(500).send(error);
      }else {
        console.log('Email sent successfully' + info.response);
        res.status(200).send("email sent")
      }
    });
 }
}


export const {Email} = EmailController;