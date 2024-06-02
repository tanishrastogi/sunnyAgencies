import { Router } from "express";
import {
  fetchPurchase,
  fetchPurchaseByID
} from "../controllers/purchase.controllers.js";

const router = Router();

router.route("/fetch/id").post(fetchPurchaseByID);
router.route("/fetch/all").post(fetchPurchase);

export default router;