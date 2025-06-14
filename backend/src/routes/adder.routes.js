import { Router } from "express";
import { account_adder } from "../controllers/data_adders/reckon_to_db/account_adder.js";
import { item_adder } from "../controllers/data_adders/reckon_to_db/item_adder.js";
import { upload } from "../middlewares/multer.mdlw.js";
import { sale_adder } from "../controllers/data_adders/reckon_to_db/sale_adder.js";
import { collection_adder } from "../controllers/data_adders/reckon_to_db/collection_adder.js";

const router = Router();

router.route('/accounts').post(upload.single('xlsx'),account_adder);
router.route('/items').post(upload.single('xlsx'),item_adder);
router.route('/sale').post(upload.single('xlsx'),sale_adder);
router.route('/collection').post(upload.single('xlsx'),collection_adder);


export default router;

