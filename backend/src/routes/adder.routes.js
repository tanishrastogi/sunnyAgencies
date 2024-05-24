import { Router } from "express";
import { account_adder } from "../controllers/data_adders/reckon_to_db/account_adder.js";

const router = Router();

router.route('/accounts').post(account_adder);

export default router;