import express,{ Express } from "express";
import cors from "cors";
import helmet from "helmet";
import {port,mongoUrl} from "./config/index";
import {CONNECTDB} from "./DatabaseConnection/connection";
import { ErrorHandler } from "./ErrorHandler/ErrorHandler";
const app:Express = express();

//middlewares
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(helmet());

//database connection
CONNECTDB(mongoUrl);

//router 
app.use('/api/auth',require("./router/User"));
app.use('/api/products',require("./router/Products"));
app.use('/api/orders',require("./router/Order"));
app.use('/api/address',require("./router/Address"));
app.use('/api/upload',require("./router/upload"));
app.use('/api/category',require("./router/Category"));
app.get('/', (req,res)=>{
 res.send("the grocery api");
});

//Error Handler
app.use(ErrorHandler);

//port listening
app.listen(port,()=>{
console.log(`server is listening at ${port}`);
});