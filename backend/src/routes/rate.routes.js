import { Router } from "express";
// import { rate_analyser } from "../controllers/analytics/rate_analyser.js";
import { fetchRates } from "../controllers/data_fetchers/rates.fetcher.js";

const router = Router();

// router.route('/rates/').post(rate_analyser);
router.route('/fetch/all').post(fetchRates);


export default router;