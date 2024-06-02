import { Router } from "express";
import { searchApiForAccounts, searchApiForProducts, searchApiForPurchases } from "../controllers/search.controllers.js";

const router = Router();

router.route("/items").post(searchApiForProducts)
router.route("/accounts").post(searchApiForAccounts)
router.route("/purchases").post(searchApiForPurchases)

export default router;