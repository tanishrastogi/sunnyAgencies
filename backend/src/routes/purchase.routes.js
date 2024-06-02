import { Router } from "express";
import { fetchPurchaseByID } from "../controllers/purchase.controllers";

const router = Router();

router.route("/fetch/purchase/id").post(fetchPurchaseByID);
router.route("/fetch/purchase/all").post(fetchPurchase);

export default router;