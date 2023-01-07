import express from "express";
import { Uploader } from "../Controllers/uploader";
import {multerUpload} from "../multer"
const router = express.Router();

router.post('/',multerUpload.single('grocery'), Uploader);


module.exports = router;