import { Router } from "express";
import { ratePDFcreator } from "../controllers/display/rates.display.js";

const router = Router();

router.route("/pdf/rates").post(ratePDFcreator);

export default router;

