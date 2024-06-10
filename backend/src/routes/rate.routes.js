import { Router } from "express";
// import { rate_analyser } from "../controllers/analytics/rate_analyser.js";
import { fetchRates, item_rates_fetcher } from "../controllers/data_fetchers/rates.fetcher.js";

const router = Router();

// router.route('/rates/').post(rate_analyser);
router.route('/fetch/all').post(fetchRates);
router.route('/fetch/id').post(item_rates_fetcher);


export default router;