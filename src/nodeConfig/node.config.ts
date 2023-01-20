import dotenv from "dotenv";
import path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

export const nodeConfig = {
	env: {
		port: process.env.PORT || 5000,
		secretKey: process.env.SECRET_KEY || 'secretkeythatisnotpublic',
		mongoUrl:process.env.MONGO_URL || 'mongodb+srv://mbathi:shanicecole@cluster0.hex8l.mongodb.net/Grocery_Api?retryWrites=true&w=majority',
	    cloud_name: "mbathi",   
        api_key: "977179525928855",
        api_secret: "P5I6ukSyTe0u7Dcb_pJPhf-Bmv8",
		user:"interwoodkraftinteriors35@gmail.com",
		pass:"xdhnpskxkrvqgyqc",
		consumersecret:"TIGP4yJmU4DAakY1",
		consumerkey:"hYpWHX6Ch9HVsTHTPGIPvmHkvKt4M04v",
		passkey:"bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
		shortcode:"174379"
	
	
	
	},		
};