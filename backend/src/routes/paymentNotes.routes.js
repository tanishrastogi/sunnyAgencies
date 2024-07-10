import { Router } from "express";

import {
  fetchAll,
  fetchByAccount,
  fetchByDate,
  fetchByID,
  createNote,
  deleteAll,
  deleteNoteByDate,
  deleteNoteByID,
  deleteNoteByPartyID
} from "../controllers/paymentNotes.controller.js";

const router = Router();

router.route("/fetch/id").post(fetchByID);
router.route("/fetch/all").post(fetchAll);
router.route("/fetch/account").post(fetchByAccount);
router.route("/fetch/date").post(fetchByDate);
router.route("/create").post(createNote);
router.route("/delete/all").post(deleteAll);
router.route("/delete/date").post(deleteNoteByDate);
router.route("/delete/id").post(deleteNoteByID);
router.route("/delete/party").post(deleteNoteByPartyID);

export default router;