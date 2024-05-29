import { Router } from "express";
import { searchApiForProducts } from "../controllers/search.controllers.js";

const router = Router();

router.route("/items").post(searchApiForProducts)

export default router;