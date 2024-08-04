import { Router } from "express";
import { fetchAccountByID, fetchAllAccount } from "../controllers/account.controllers.js";

const router = Router();

router.route("/fetch/all").post(fetchAllAccount)
router.route("/fetch/id").post(fetchAccountByID)

export default router;