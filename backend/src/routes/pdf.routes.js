import { Router } from "express";
import { createMrOutstandingPDF } from "../controllers/pdf-generators/mrOutstanding.js";


const router = Router();

router.route("/create/mr-outstanding").post(createMrOutstandingPDF);

export default router;