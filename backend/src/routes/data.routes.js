import { Router } from "express";
import { peak_sale_by_month, same_peak_every_year } from "../controllers/analytics/data.fetcher.js";
import { read_bill } from "../controllers/bill_reader.js";

const router = Router();

router.route("/peaksale/month").post(peak_sale_by_month);
router.route("/peaksale/every-year-same-month").post(same_peak_every_year);
router.route("/bill-read").get(read_bill);

export default router;