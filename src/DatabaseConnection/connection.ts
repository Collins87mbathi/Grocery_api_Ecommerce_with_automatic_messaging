import mongoose from "mongoose";

class ConnectDB {
   public static CONNECTDB =  (url:string) => {
     mongoose.connect(url).then(()=> console.log('database connected ✨✨')
     ).catch((err)=> console.log(err)
     )
    }
}
export const {CONNECTDB} = ConnectDB;