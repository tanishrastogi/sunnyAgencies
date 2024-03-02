import { Router } from "express";
import { peak_sale_by_month, same_peak_every_year } from "../controllers/analytics/data.fetcher.js";

const router = Router();

router.route("/peaksale/month").post(peak_sale_by_month);
router.route("/peaksale/every-year-same-month").post(same_peak_every_year);

export default router;