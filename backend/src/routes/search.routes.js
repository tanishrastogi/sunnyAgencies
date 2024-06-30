import { Router } from "express";
import { searchApiForAccounts, searchApiForBills, searchApiForProducts, searchApiForPurchases } from "../controllers/search.controllers.js";

const router = Router();

router.route("/items").post(searchApiForProducts)
router.route("/accounts").post(searchApiForAccounts)
router.route("/purchases").post(searchApiForPurchases)
router.route("/bills").post(searchApiForBills)

export default router;