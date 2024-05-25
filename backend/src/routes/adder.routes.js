import { Router } from "express";
import { account_adder } from "../controllers/data_adders/reckon_to_db/account_adder.js";
import { item_adder } from "../controllers/data_adders/reckon_to_db/item_adder.js";
import { upload } from "../middlewares/multer.mdlw.js";

const router = Router();

router.route('/accounts').post(upload.single('xlsx'),account_adder);
router.route('/items').post(upload.single('xlsx'),item_adder);


export default router;