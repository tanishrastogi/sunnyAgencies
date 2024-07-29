import { Router } from "express";
import { createMrOutstandingPDF } from "../controllers/pdf-generators/mrOutstanding.js";
import { PartyItemHistory } from "../controllers/pdf-generators/party_item_history.js";


const router = Router();

router.route("/create/mr-outstanding").post(createMrOutstandingPDF);
router.route("/create/party-item-history").post(PartyItemHistory);

export default router;