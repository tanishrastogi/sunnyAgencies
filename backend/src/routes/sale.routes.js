import { Router } from "express";
import { past_item_sale_data } from "../controllers/data_fetchers/sale.fetcher.js";

const router = Router();

router.route("/past-item-sale-data").post(past_item_sale_data);

export default router;