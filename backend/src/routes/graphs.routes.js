import { Router } from "express";
import { barGraph } from "../controllers/analytics/graphs.controllers.js";

const router = Router();

router.route('/bar').post(barGraph);

export default router;