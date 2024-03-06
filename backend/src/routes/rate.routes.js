import { Router } from "express";
import { rate_analyser } from "../controllers/analytics/rate_analyser.js";

const router = Router();

router.route('/rates/').post(rate_analyser)

export default router;