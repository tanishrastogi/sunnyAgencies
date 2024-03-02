import {Router} from "express";
import { add_item } from "../controllers/analytics/data_from_python.js";

const router = Router();

router.route("/fetch-item-data").get(add_item);

export default router;