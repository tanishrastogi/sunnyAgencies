import { Router } from "express";
import { searchApiForAccounts, searchApiForProducts } from "../controllers/search.controllers.js";

const router = Router();

router.route("/items").post(searchApiForProducts)
router.route("/accounts").post(searchApiForAccounts)

export default router;